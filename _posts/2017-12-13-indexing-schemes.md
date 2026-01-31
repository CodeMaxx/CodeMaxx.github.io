---
title: "Hacking Postgres Internals - Indexing Schemes for Data Recording Systems"
layout: post
date: 2017-12-13 8:20
tag:
- Databases
- C
- Postgres
projects: true
star: true
description: "Hacking Postgres Internals - Indexing Schemes for Data Recording Systems"
---

![Databases](/assets/images/database.jpg)

# Project Report

| Team DataAcids  | |
| ------------- | ------------- |
| [Harshith Goka](https://github.com/tastelessjolt/)  | |
| [Akash Trehan](https://github.com/codemaxx)  | |
| [Abhishek Kumar](https://github.com/AbhishekKumar16) | |
| [Tarun Verma](https://github.com/vermatarunv) | |

For the backstory on this project read [this](../project-ditch/) first.

The [code for this project](https://github.com/CodeMaxx/postgres-with-stepped-merge-index) has been open-sourced on Github.

## Introduction

Every minute, 600,000 pieces of content are shared on Facebook, and more than 100,000 tweets are sent. And that does not even begin to scratch the surface of data generation, which spans to sensors, medical records, corporate databases, and more. With such a high amount of data being stored, viewed and analysed, a demand for high performance comes as a must. Hence, the need of the hour is that the data should be stored and retrieved quite efficiently without the performance being compromised.

The reference paper for the project can be found [here](https://www.cse.iitb.ac.in/~sudarsha/Pubs-dir/indexbuffering-vldb97.pdf).


## Objectives
1. Design a technique that supports both insertion and queries with reasonable efficiency, and without the delays of periodic batch processing.
2. Implement this on top of PostgreSQL, one of the most popular open-source DBMS.


## Functionalities
1. Insertion of new tuples into the relation along with updating the corresponding stepped-merge index
2. Search using the custom index we implement


## System Architecture

**Front-end**

- There is no real front-end we will implement. It is just the user interface that PostgreSQL provide.

**Back-end**

1. Implemented a structure similar to Log Structured Merge trees(Stepped Merge Trees) to organize the incoming data on the basis of clustering by search key.
- Worked in single-user mode
- Not handled concurrency control and recovery issues
2. Implemented in the C language.
3. Used Eclipse IDE for debugging and building the project.


## Engineering details:-

Our goal was to maintain multiple indices(runs) for maintaining the actual index. Only one of the indices(run) would be in the memory at a particular time and would act as an index for the latest incoming data. After this run fills up the memory it is written to the disk using B-tree bottom up build. Both the in memory run and the one just constructed are Level -1 runs.

We have implemented a stepped-merge algorithm as suggested in the paper. There are two parameters to the algorithm `K` (denoting number of maximum number of trees at any level) and `N`(Number of levels). When `K` runs of level `i` accumulate on disk, we merge them to create a single `i+1` level run. When finally a `N` level run is reached, we write it to the root relation.


- To go about this task, we firstly have to make Postgres recognise that we have created an index. Firstly we need to add an entry into `pg_am` system catalog to identify our `'``smerge``'` index as an access method. This is done by adding an entry to the file `pg_am.h` and giving it a unique OID and the name of the handler(which would be created next).

```c
    DATA(insert OID = 9399 (  smerge        smergehandler i ));
    DESCR("stepped merge index access method");
    #define SMERGE_AM_OID 9399
```

- To be useful, an index access method must also have one or more operator families and operator classes defined in `pg_opfamily`, `pg_opclass`, `pg_amop`, and `pg_amproc` which allow the planner to determine what kinds of query qualifications can be used with indexes of this access method. Hence the corresponding entries are added in the corresponding files.


- Next, a new access method directory is created in `src/backend/access` (called ‘smerge’ in our case) . Inside this directory we create a file called `smerge.c`(corresponding .h file is also created in `src/include/access`) and define the handler function that returns `IndexAmRoutine` with access method parameters and callbacks. Various parameters are set in this handler regarding the kind of support our index provides. For example, `amroutine->amcanorder` is set to false indicating that the ordering is not yet supported with the index. All the functions from `nbtree.c` are retained (names are changed according to our convenience) whose definitions would be changed complying to out requirements. The basic idea was to use the functionalities of `nbtree` by calling them from these functions or using their ideas as much as possible as we were merely building multiple versions of them.


- For building a new smerge index, `smergebuild()` function is used which is tailored to create btree index statement, and executed it giving a unique OID to that index. The in-built function `DefineIndex()` (Defined in `indexcmds.c`, that created a new index given the index creating statement and other parameters)was used for this. Also in this function, we needed to add the metadata corresponding to each binary tree. The metadata that has to be inculded is defined in the struct smMetadata defined as follows:-

```c++
    typedef struct SmMetadata {
            int K;
            int N;

            int attnum;
            AttrNumber attrs[INDEX_MAX_KEYS];

            int levels[MAX_N];
            Oid tree[MAX_N][MAX_K];

            int currTuples;

            Oid curr;
            Oid root;

            bool unique;
    } SmMetadata;
```

- The metadata is stored by first allocating a page of size of a block defined as BLCKSZ and then calling functions `_sm_init_metadata``()` and `_sm_writepage``()` which are defined in the file `smmeta.c`.
  - `_sm_init_metadata``()` is used for the purpose of initialisation of the metadata values. We have hard-coded the values of K and N here.
  - `_sm_writepage``()` uses similar functions as used by the storage module of postgres specifically `smgrwrite()`to store the metadata onto the first page of the smerge index relation.


- As the OID of the newly created index is stored in its metadata page using `smgrwrite()` function it would be easy for us to get the btree using `index_open()` on the stored OID easily.


- Next part is to insert an index tuple into the current btree.
  - For this we first get the metadata of the relation and then extract the OID of the current in-memory b-tree using `_get_curr_btree()` function which simply uses the `index_open` function to get that b-tree.
  - Once we have this `btreeRel`, we simply call the `bt_insert()` function for inserting the new tuple, followed by closing the opened index using `index_close()` function.
  - Next we need to check if the current in-memory tree is full. If yes, then create a new in-memory tree using _sm_create_curr_btree() function and calling `sm_flush``()` to flush the values into the next level.
  - Finally we also need to write to the metadata page the changed values as a new tuple was added and the current count of number of entries the in-memory tree has changed. So we again call the function `_sm_write_metadata()` to update the meta-data.


- `smsort.c` contains the implementation for merging the indices which involves creation of spools for various indices and then merging them. The main function called when it’s time to merge is the `sm_flush()` function.


- We also need that after creating the smerge index, all search queries go through this for debugging. Hence, as a hack we have changed the `smergecostestimate()` function and set the costs very low(Close to 0).


- Now once one of the levels is full, and it’s time to merge the k runs, `sm_flush()` is invoked which is responsible for merging the `k` level `i` runs into a single `i+1` level run. The function’s implementation is inspired from the function `bt_load()` of the file `nbtsort.c`, which merges two spools (the second one is for dead tuples).


- For creating the spools we need to get the tuples corresponding to each index separately. For this we do an index only scan the get all tuples for the particular index. Then we create a Scankey such that all the tuples are returned. Currently we assumed the entries being greater than a particular number ( we can use the smallest integer which fits in an `int` for this). After creating the spools, they are sent into the `tuplesort_performsort()` function. Although the spools are already sorted, the sortstate needs to be setup properly which is done by the given function. Merging of level N-1 into root is handled separately but uses a similar merging logic.


## Run Through

 **K = 3, N = 3, max_tuple_per_index = 4**

`create table foo (uid int, name varchar(20));` # Create a sample table
`create index sm on foo using smerge (uid);` # Creates the smerge index

`insert into foo values (1, 'axzagd');`<br>
`insert into foo values (2, 'axzagd');`<br>
`insert into foo values (3, 'axzagd');`<br>
`insert into foo values (4, 'axzagd');`<br>
-------------------- Memory index fills up. A new index1 is created and the filled index goes to level 0<br>
`insert into foo values (5, 'axzagd');`<br>
`insert into foo values (6, 'axzagd');`<br>
`insert into foo values (7, 'axzagd');`<br>
`insert into foo values (8, 'axzagd');`<br>
-------------------- Similar index 2 is created<br>
`insert into foo values (9, 'axzagd');`<br>
`insert into foo values (10, 'axzagd');`<br>
`insert into foo values (11, 'axzagd');`<br>
`insert into foo values (12, 'axzagd');`<br>
-------------------- Similar index 3 is created. Level 0 fills up. Index 1, 2, 3 are merged to create a level 1 index.<br>
`insert into foo values (13, 'axzagd');`<br>
`insert into foo values (14, 'axzagd');`<br>
`insert into foo values (15, 'axzagd');`<br>
`insert into foo values (16, 'axzagd');`<br>
-------------------- New level 0 index is created and so on.<br>
`insert into foo values (17, 'axzagd');`<br>
`insert into foo values (18, 'axzagd');`<br>
`insert into foo values (19, 'axzagd');`<br>
.<br>
.<br>
After `N-1`th level fills up, it is merged with the single root relation.


## Further Work
- We had hard-coded the parameters `N` and `K` into the code which could be kept as user-parameters which could then be changed later on.
- The cost operations are to be implemented properly
- As of now postgres choosed btrees for the default indices(primary key, foreign key etc.). Changes need to be made so that smerge is chosen.
- Currently, for search queries, we are starting our search from the root relation moving upwards which may not necessarily produce outputs in sorted order(which might be desired in certain situations). In short, the ordering property is not supported and the step to output tuples could be modified to sort before giving output.
- There are memory(specifically relcache memory leaks) leaks which were not properly handled in the code which should be properly handled before doing performance improvement tests against btrees.
- Update and Delete operations are not yet supported in the project which we have implemented. Once the order by operation is handled, these could be done efficiently. In addition, bloom filters might be needed for performing these.


## Resources

<https://www.postgresql.org/docs/9.6/xindex.html> (Prequel for the below)
<https://www.postgresql.org/docs/9.6/indexam.html>
<https://www.postgresql.org/files/developer/internalpics.pdf>
<https://www.pgcon.org/2016/schedule/attachments/434_Index-internals-PGCon2016.pdf>

*All mentions of B-tree actually refer to B+ trees