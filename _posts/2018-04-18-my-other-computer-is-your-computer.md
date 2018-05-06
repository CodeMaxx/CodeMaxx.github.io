---
title: "My Other Computer is Your Computer - Malware Classification"
layout: post
date: 2018-04-18 11:00
tag:
- Security
- Malware
- Machine Learning
- Project
projects: true
description: "Microsoft Malware Classification Challenge"
---

![Malware](/assets/images/malware/malware.jpg)


## Background

#### Why this project?
This project emerged for fulfilling a requirement of the Machine Learning course (EE 769) I took this semester. As I have always been interested in computer security, I wanted to combine my newly learnt knowledge from this course with it. The attacks last year from malwares like [WannaCry](https://www.wikiwand.com/en/WannaCry_ransomware_attack), [NotPetya](https://www.wikiwand.com/en/Petya_(malware)#/2017_Cyberattack) and [Bad Rabbit](https://www.kaspersky.com/blog/bad-rabbit-ransomware/19887/) had made me curious about how these attacks could be prevented. Malware Classification was the perfect project. For this I teamed up with my good friend Mukesh Pareek who is also a security enthusiast. This post is written in collaboration with him.

#### Malware
Wikipedia defines [malware](https://www.wikiwand.com/en/Malware) as:

>   Malware, short for malicious software, is an umbrella term used to refer to a variety of forms of hostile or intrusive software, including computer viruses, worms, Trojan horses, ransomware, spyware, adware, scareware, and other intentionally harmful programs.

The definition tells us that there are many classes of malware. These categories are made based on how the malware propagates as well as what its intent is.


## The Problem

On hearing about malware classification two things come to mind:

1. Separating malware from benign files
2. Given a malware, identifying which class the malware belongs to

We focused on solving the second problem.

But why classify malware into classes? Just like a doctor can treat you better if he/she knows what disease you have, anti-malware softwares like antiviruses can defend better if they know the class of malware they are dealing with.


#### Challenges

Earlier malware was detected using signatures. So whenever there a new malware was found, the companies created its signature and any file whose signature matched was detected. Since this method could only find exact matches, it was very restrictive. Later people shifted to identifying "indicators" which were the defining properties of a class of malware. So if a file had certain indicators it could be classified to the corresponding class. But this again uses only known indicators. With new methods to obfuscate and polymorphism techniques, the creators of these malwares were easily able to get across this layer of protection. The problems we face today is that millions of samples of malware spread everyday. Most of these are duplicates or slight modifications of one another made to decieve the defense systems. Classifying malware thus becomes a daunting task.


#### Why Machine Learning?

In today's data rich world, machine learning has become ubiquitous. With its ability to find useful pieces of information from data, machine learning has lead to great results. The defense against a malware attack depends on the broader category of malware and not necessarily on the specific attack sample. This is why machine learning can be used. It can find hidden relationships among the various features of the samples and then leverage those to classify unknown samples. 


#### More specifically...

Now we come to what exactly is the information we have about the malware and what categories do we need to classify it to.

For every malware sample, the input we have is:

1. ".asm" file - This contains the assembly code for the malware program and can be used to extract information about instruction calls, segments etc.

![Screenshot of .asm file]()

2. ".bytes" file - This contains the hexadecimal representation of the file's binary content. It can be used to extract infomation about the lower level functioning of the malware.

![Screenshot of .bytes file]()

So these two files need to be used to classify the malware into the following 9 families:

1. Ramnit
2. Lollipop
3. Kelihos_ver3
4. Vundo
5. Simda
6. Tracur
7. Kelihos_ver1
8. Obfuscator.ACY
9. Gatak

#### The dataset

The specific problem as stated above is taken from a [malware classification challenge](https://www.kaggle.com/c/malware-classification) organised by Microsoft on Kaggle. The dataset was also taken from there. The dataset contained 200 GB of training data and 200 GB of test data. Since we didn't have the labels for the test data, we divided the training data itself into two parts one of which we used for testing purposes. The testing part was half the size of the training part with training having 7221 samples and test having 3648 labels. This divison was done randomly but ensuring that enough members of each class were are a part of both the training and test set.

Each malware sample had a 20 character long ID. We had a csv contatining the ID to Class mapping of the training samples.

[! Dataset Class Graph]


## Preprocessing and Feature Extraction [^code]
[^code]: Our code is available on github [here](https://github.com/CodeMaxx/my-other-computer-is-your-computer)

The features we used for classification are as follows:

1. Instruction n-gram from _.asm_ file - We extracted a list of instructions from the .asm file and used the count for each instruction (1-gram) and instruction-instruction pair (2-gram).

2. Byte n-gram from _.bytes_ file - We used the hexadecimal representation to extract the byte sequence of the actual malware. Then we used the 1-gram and 2-gram count as our features

3. Segment Size - We store the number of lines in each of the segments - Header, Data, Text etc. This information is extracted from the _.asm_ files

4. Pixel Intensity of _.asm_ files -  We converted the _.asm_ file into an image and then extracted the last 1000 pixels of the image as features

Our intuition behind using instruction n-grams was that samples from the same class of malware should have similar code and hence there should be similar instructions sequences present in the code. n-grams were a way to represent that. Likewise for the byte n-grams. Using segment size is again based on the intuition that the amount of static data, the amount of space required for the code would be similar for the same class.

#### Implementation details

Extracting the above features involves text processing and parsing. For this we used the `pyparsing` python library. The library can be used to specify token formats which make it easier to identify the required instructions or bytes. For getting an image from the _.asm_ file we used byte arrays.

For speeding up the feature extraction we used the `ProcessPoolExecutor` from `concurrent` library which made sure that all the cores were being used for processing.

After extracting the features we dumped them to a file so that the processing need not be done again.

## Training

We used the following models/techniques for learning:

1. Support Vector Classifier
2. Xtreme Gradient Booster
3. Logistic Regression
4. K Nearest Neighbour Classifier
5. Random Forest
6. Neural Network

For each of these models we did hyperparameter tuning to find out the best model. Grid search was used to try out all combinations for the values of hyperparameters. We used k-fold cross validation with k=4 for training. To make efficient use of our CPUs we did the grid search in parallel since training of each hyperparameter combination is independent of the other. We used `sklearn` and `xgboost` libraries to help us with training.

## Evaluation

#### Hyperparameter Tuning

The graphs for hyperparameter tuning are as follows:

![Graphs with model as caption]

- Graphs for hyperparameter tuning

#### Cross Validation and Test Accuracy

- Table for cross validation and test accuracy

## What didn't work out

What did not work is as important as understanding what worked. This section talks about the challenges we faced during this project and what we learned from them.

## Conclusion and Future Work

Also, machine learning models aren’t full-proof too. The dataset usually used to train the models is biased because of lack of collaboration in the industry. And hence it poses a serious threat of overfitting.

### References

[1] [Malware Images: Visualization and Automatic Classification](http://vizsec.org/files/2011/Nataraj.pdf)

[2] [Code Obfuscation and Malware Detection](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.109.644&rep=rep1&type=pdf)

[3] [Microsoft Malware Clasification Challenge 2015](https://www.kaggle.com/c/malware-classification/data)

[4] [Feature selection and extraction for Malware Classification](http://www.iis.sinica.edu.tw/page/jise/2015/201505_11.pdf)
