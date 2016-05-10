---
title: "SymEngine"
layout: post
date: 2016-05-9 8:10
tag:
- Open Source
- Mathematics
- C++
projects: true
star: true
description: "Symbolic Computation C++ Library"
---

<center>A standalone fast C++ symbolic manipulation library.</center>

This project marks the beginning of my journey with Open Source. I was introduced to this project by [@Sumith1896](https://github.com/Sumith1896) who was himself a [GSoC](https://summerofcode.withgoogle.com/) student in [SymEngine](https://github.com/symengine/symengine/) in 2015. A large perentage of my open source contributions are in this project. Besides contributing code I also review PRs and participate in discussions. I got introduced to lots of advanced details of C++ and the produre of software developement. SymEngine is currently the fastest [Computer Algebra System](https://en.wikipedia.org/wiki/Computer_algebra_system). Lately I have been working on adding support for `Infinity`class which has a wide variety of used in mathematics systems.

A short description of [My Pull Requests](https://github.com/symengine/symengine/pulls?q=is%3Apr+author%3ACodeMaxx+is%3Aclosed) in SymEngine:

1. [PR #678](https://github.com/symengine/symengine/pull/678)(**Merged**) - Wrote a python script to check for the presence of Trailing Whitespace in the code during continuous integration in Travis.

2. [PR #715](https://github.com/symengine/symengine/pull/715)(**Merged**) - Moved dependencies(Catch and Teuchos) to utilities directory so that all the dependencies are together in a single subfolder.

3. [PR #727](https://github.com/symengine/symengine/pull/727)(**Merged**) - Added an additional compiling test for Travis with the latest gcc and g++ compiler(version 5.2 for both when I did this) so that new warnings coming up from these can be fixed.

4. [PR #736](https://github.com/symengine/symengine/pull/736)(**Merged**) - Adds five new functions, for finding quadratic residues, for checking if a number is a quadratic residue of another ,for checking if a number is a nth power residue of the other and added to helper functions to improve performance. Added tests for them. Also fixed variable names in another function which were causing ambiguity. This led to an issue for checking Integer overflows. This was my first PR in which I had to read about algorithms. It taught me how to teach myself completely new stuff.

5. [PR #758](https://github.com/symengine/symengine/pull/758)(**Merged**) - Removed some redundant code left by another Developer's PR.

6. [PR #761](https://github.com/symengine/symengine/pull/761)(**Merged**) - Fixed a bug in `eval_mpfr.cpp` and `eval_mpc.cpp` where Euler's constant was being instead of Euler's Number.Added Tests for the same. This got me introduced to new libraries such as `mpc`, `mpfr`, `mpz` and how to use them - the syntax and functions used.

7. [PR #767](https://github.com/symengine/symengine/pull/767)(**Merged**) - Code for Whitespace Check shifted to the end of Travis file so that other more important errors can be handled first, before the program exits due to trailing  whitespaces.

8. [PR #792](https://github.com/symengine/symengine/pull/792)(**Merged**) - Added complete functionality for functions `sech`, `csch` and `acsch` and their Derivatives,printing and tests. This was my first major contributions. I added code to a lot of files. It helped me understand how all of it works together.

9. [PR #795](https://github.com/symengine/symengine/pull/795)(**Closed**) - This meant to prevent the use of 'Arb' when the user disables 'Flint'. It was closed since the discussion proved the corresponding [Issue #788](https://github.com/symengine/symengine/issues/788) to be Invalid. This helped me learn a lot of new things about `cmake` and how it works.

10. [PR #807](https://github.com/symengine/symengine/pull/736)(**Merged**) - Improved and fixed functions of `Polygamma` class and added tests for the same.

11. [PR #815](https://github.com/symengine/symengine/pull/815)(**Unmerged**) - Add a cmake switch to prevent `Catch` from catching exceptions so that stacktraces can be obtained from `Teuchos`. This helped me learn about how `Catch` works.

12. [PR #835](https://github.com/symengine/symengine/pull/835)(**Merged**) - Improves the `abs` functions so that it can handle `Complex`. I also tried to implement functionality of `abs(x-y)` being treated the same as `abs(y-x)`. This helped me gain a lot of insight into the core structure of SymEngine i.e. `Add`,`Mul` and the functions such as `could_extract_minus`.

13. [PR #893](https://github.com/symengine/symengine/pull/893)(**Merged**) - Added a lot of tests for complete coverage of `UnivariatePolynomial` and `UnivariateIntPolynomial` classes. This PR help discover a number of bugs in these classes. These classes were added as a part of a project by UC Davis students.

14. [PR #894](https://github.com/symengine/symengine/pull/894)(**Closed**) - Fixed bug in Polynomial Derivative. Derivative was being calculated even when the variable was empty `""`. Closed since we expected the user not to do such foolish stuff :P

15. [PR #895](https://github.com/symengine/symengine/pull/895)(**Merged**) - Fixed bug in `is_canonical` for Polynomials.

16. [PR #896](https://github.com/symengine/symengine/pull/896)(**Merged**) - Use `from_dict()` for `UnivariatePolynomials`. Prevents redundant pass of `degree` attribute.

17. [PR #897](https://github.com/symengine/symengine/pull/897)(**Merged**) - Added support for polynomials with negative degree. This was a major necessity for `Multivariate and Univariate Series Expansion` Projects.

18. [PR #899](https://github.com/symengine/symengine/pull/899)(**Closed**) - Implemented Horner's Scheme for evaluating `Univariate Polynomials`. Closed since it was found to sloer than normal evaluation.

19. [PR #901](https://github.com/symengine/symengine/pull/901)(**Merged**) - Improved Install instuctions in Readme.

20. [PR #904](https://github.com/symengine/symengine/pull/904)(**Unmerged**) - Some changes in `clang-format` configuration. Remove Linux version error for `clang-format`.

21. [PR #916](https://github.com/symengine/symengine/pull/916)(**Unmerged**) - Implement `Infinity` class. Still in progress. My favourite contribution! :D

22. [PR #917](https://github.com/symengine/symengine/pull/917)(**Unmerged**) - Prevent sorting of `includes` with `clangformat`. Will be useful after SymEngine upgrades to `clang-format 3.8`