import { useState, useEffect, useRef } from "react";

// ── COMPLETE BOOK DATA FROM CLASS 12 CS TEXTBOOK ─────────────────────────────
const BOOK_DATA = {
  // Ch 1 – Function
  1: {
    title: "Ch.1 · Function — Recursive Power",
    language: "ocaml",
    chapter: "Chapter 1 – Function",
    description: "Pure recursive function: computes a to the power of b.",
    code: `(* requires: b >= 0 *)
(* returns: a to the power of b *)
let rec pow a b :=
  if b = 0 then 1
  else a * pow a (b - 1)

(* Factorial using recursion *)
(* requires: n >= 0 *)
let rec fact n :=
  if n = 0 then 1
  else n * fact (n - 1)

(* GCD — Greatest Common Divisor *)
let rec gcd a b :=
  if b <> 0 then gcd b (a mod b)
  else a

(* Example outputs:
   gcd 13 27  → 1
   gcd 20536 7826 → 2
   fact 5     → 120
   pow 2 10   → 1024 *)`,
  },
  4: {
    title: "Ch.1 · Pure vs Impure Functions",
    language: "ocaml",
    chapter: "Chapter 1 – Function",
    description: "Pure function (square), impure function (random), and side-effects explained.",
    code: `(* PURE FUNCTION — same input always gives same output *)
let square x :=
  return: x * x
(* square 5 = 25, always *)

(* IMPURE FUNCTION — result varies each call *)
let randomnumber :=
  a := random()
  if a > 10 then return: a
  else return: 10

(* SIDE EFFECT — modifying external variable *)
y := 0
let inc (x: int) : int :=
  y := y + x
  return (y)
(* inc changes 'y' outside the function — side effect! *)

(* Chameleons of Chromeland: monochromatize *)
(* inputs : a = A, b = B, c = C, a = b *)
(* outputs: a = b = 0, c = A+B+C       *)
let rec monochromatize a b c :=
  if a > 0 then
    a, b, c := a-1, b-1, c+2
  else
  monochromatize a b c
  return a, b, c`,
  },
  // Ch 2 – Data Abstraction
  12: {
    title: "Ch.2 · Data Abstraction — City ADT",
    language: "python",
    chapter: "Chapter 2 – Data Abstraction",
    description: "Constructors and selectors for a City abstract data type.",
    code: `# Abstract Data Type: City
# Constructor builds the object; Selectors extract data

# -- constructor
def makecity(name, lat, lon):
    return [name, lat, lon]

# -- selectors
def getname(city):   return city[0]
def getlat(city):    return city[1]
def getlon(city):    return city[2]

# Distance between two cities
def distance(city1, city2):
    lt1, lg1 = getlat(city1), getlon(city1)
    lt2, lg2 = getlat(city2), getlon(city2)
    return ((lt1 - lt2)**2 + (lg1 - lg2)**2) ** 0.5

# Rational Number ADT using List (Pair)
def rational(n, d):
    return [n, d]

def numer(x):   return x[0]
def denom(x):   return x[1]

# Example usage
x, y = 8, 3
r = rational(x, y)
print(numer(r), "/", denom(r))   # 8 / 3

# Using Class (Structure) for multi-part objects
class Person:
    def __init__(self):
        self.firstName = " "
        self.lastName  = " "
        self.id        = " "
        self.email     = " "

p1 = Person()
p1.firstName = "Padmashri"
p1.lastName  = "Baskar"
p1.id        = "994-222-1234"
p1.email     = "compsci@gmail.com"
print("First Name:", p1.firstName)   # Padmashri`,
  },
  // Ch 3 – Scoping
  23: {
    title: "Ch.3 · Scoping — LEGB Rule",
    language: "python",
    chapter: "Chapter 3 – Scoping",
    description: "Local, Enclosed, Global and Built-in scopes demonstrated with Python.",
    code: `# LEGB Rule — Local → Enclosing → Global → Built-in

# LOCAL SCOPE
def Disp():
    a = 7          # local to Disp()
    print(a)       # Output: 7
Disp()

# GLOBAL SCOPE
a = 10             # global variable
def Disp2():
    a = 7          # local shadows global inside function
    print(a)       # 7
Disp2()
print(a)           # 10 (global unchanged)

# ENCLOSED SCOPE — nested functions
def outer():
    a = 10
    def inner():
        print(a)   # accesses outer's 'a' — enclosed scope
    inner()        # Output: 10
    print(a)       # Output: 10
outer()

# MODIFYING GLOBAL with keyword
x = 0
def add():
    global x
    x = x + 5
    print("Inside add():", x)
add()
print("In main, x =", x)
# Output:
# Inside add(): 5
# In main, x = 5`,
  },
  // Ch 4 – Algorithmic Strategies
  36: {
    title: "Ch.4 · Linear Search Algorithm",
    language: "python",
    chapter: "Chapter 4 – Algorithmic Strategies",
    description: "Sequential search — O(n). Checks each element one by one.",
    code: `# LINEAR SEARCH — O(n)
# Searches target value sequentially through the list.

def linear_search(values, target):
    """Returns index of target, or -1 if not found."""
    for i in range(len(values)):
        if values[i] == target:
            return i
    return -1    # Not found

# Example 1
values = [5, 34, 65, 12, 77, 35]
target = 77
result = linear_search(values, target)
print("Index:", result)      # Output: 4

# Example 2
values2 = [101, 392, 1, 54, 32, 22, 90, 93]
target2 = 200
result2 = linear_search(values2, target2)
print("Index:", result2)     # Output: -1 (not found)

# Complexity Analysis:
# Best case  → O(1)   : first element matches
# Worst case → O(n)   : last element or not found
# Average    → O(n)   : (n+1)/2 comparisons on average`,
  },
  38: {
    title: "Ch.4 · Binary Search Algorithm",
    language: "python",
    chapter: "Chapter 4 – Algorithmic Strategies",
    description: "Half-interval search — O(log n). Array must be sorted.",
    code: `# BINARY SEARCH — O(log n)
# Array MUST be sorted. Divides search space in half each step.

def binary_search(arr, target):
    """Returns index of target, or -1 if not found."""
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2   # avoids overflow

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1    # search right half
        else:
            high = mid - 1   # search left half

    return -1    # Not found

# Demo: searching for 60 in sorted array
arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 99]
print(binary_search(arr, 60))    # Output: 5
print(binary_search(arr, 95))    # Output: -1

# Step-by-step for target=60:
# low=0, high=9 → mid=4, arr[4]=50 < 60 → low=5
# low=5, high=9 → mid=7, arr[7]=80 > 60 → high=6
# low=5, high=6 → mid=5, arr[5]=60 == 60 → FOUND at index 5`,
  },
  39: {
    title: "Ch.4 · Bubble Sort Algorithm",
    language: "python",
    chapter: "Chapter 4 – Algorithmic Strategies",
    description: "Simple comparison sort — O(n²). Bubbles largest to end each pass.",
    code: `# BUBBLE SORT — O(n²)
# Compares adjacent pairs; swaps if out of order.
# After each pass, largest "bubbles" to end.

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Demo: {15, 11, 16, 12, 14, 13}
arr = [15, 11, 16, 12, 14, 13]
print("Before:", arr)
bubble_sort(arr)
print("After: ", arr)   # [11, 12, 13, 14, 15, 16]

# Selection Sort — one swap per pass
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

arr2 = [13, 16, 11, 18, 14, 15]
selection_sort(arr2)
print("Selection:", arr2)   # [11, 13, 14, 15, 16, 18]`,
  },
  41: {
    title: "Ch.4 · Dynamic Programming — Fibonacci",
    language: "python",
    chapter: "Chapter 4 – Algorithmic Strategies",
    description: "Fibonacci series using dynamic programming with memoization.",
    code: `# DYNAMIC PROGRAMMING — Fibonacci Series
# Stores results of sub-problems (Memoization) to avoid recomputation.

# Iterative approach (DP)
def fibonacci_dp(n):
    """Returns first n Fibonacci numbers using DP."""
    if n <= 0:
        return []
    fib = [0] * n
    if n == 1:
        return fib
    fib[0], fib[1] = 0, 1
    for i in range(2, n):
        fib[i] = fib[i-1] + fib[i-2]   # DP: use stored results
    return fib

print(fibonacci_dp(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Classic iterative (textbook style)
f0, f1 = 0, 1
print(f0, f1, end=" ")
for _ in range(8):
    fib = f0 + f1
    f0, f1 = f1, fib
    print(fib, end=" ")
# Output: 0 1 1 2 3 5 8 13 21 34

# Memoized recursive (top-down DP)
memo = {}
def fib_memo(n):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib_memo(n-1) + fib_memo(n-2)
    return memo[n]

print([fib_memo(i) for i in range(10)])`,
  },
  // Ch 5 – Python Variables & Operators
  57: {
    title: "Ch.5 · Arithmetic & Relational Operators",
    language: "python",
    chapter: "Chapter 5 – Python Variables and Operators",
    description: "Program 5.1 & 5.2 — Arithmetic operators and Relational operators.",
    code: `# Program 5.1 — Arithmetic Operators
a = 100
b = 10
print("The Sum          =", a + b)    # 110
print("The Difference   =", a - b)    # 90
print("The Product      =", a * b)    # 1000
print("The Quotient     =", a / b)    # 10.0
print("The Remainder    =", a % 30)   # 10
print("The Exponent     =", a ** 2)   # 10000
print("The Floor Div    =", a // 30)  # 3

# Program 5.2 — Relational Operators
a = int(input("Enter a Value for A: "))
b = int(input("Enter a Value for B: "))
print("A =", a, " and B =", b)
print("a == b =", a == b)
print("a >  b =", a >  b)
print("a <  b =", a <  b)
print("a >= b =", a >= b)
print("a <= b =", a <= b)
print("a != b =", a != b)

# Program 5.3 — Logical Operators
a = int(input("Enter A: "))
b = int(input("Enter B: "))
print("a > b or  a == b =", a > b or  a == b)
print("a > b and a == b =", a > b and a == b)
print("not a > b        =", not a > b)`,
  },
  60: {
    title: "Ch.5 · Conditional (Ternary) Operator",
    language: "python",
    chapter: "Chapter 5 – Python Variables and Operators",
    description: "Program 5.5 — Ternary operator and assignment operators.",
    code: `# Program 5.5 — Conditional (Ternary) Operator
a, b = 30, 20
min_val = a if a < b else b
print("The Minimum of A and B is", min_val)   # 20

# Program 5.4 — Assignment Operators
x = 10
x += 20;  print("x += 20 is =", x)    # 30
x -= 5;   print("x -= 5  is =", x)    # 25
x *= 5;   print("x *= 5  is =", x)    # 125
x /= 2;   print("x /= 2  is =", x)    # 62.5
x %= 3;   print("x %= 3  is =", x)    # 2.5 (62.5 % 3)
x **= 2;  print("x **= 2 is =", x)    # 6.25
x //= 3;  print("x //= 3 is =", x)    # 2.0

# Program 5.6 — Numeric Literals
a = 0b1010        # Binary  → 10
b = 100           # Decimal → 100
c = 0o310         # Octal   → 200
d = 0x12c         # Hex     → 300
print("Integer Literals:", a, b, c, d)

float_1 = 10.5
float_2 = 1.5e2   # 150.0
print("Float Literals:", float_1, float_2)

x = 1 + 3.14j
print("Complex:", x, "| Real:", x.real, "| Imag:", x.imag)`,
  },
  // Ch 6 – Control Structures
  68: {
    title: "Ch.6 · if / if-else / if-elif-else",
    language: "python",
    chapter: "Chapter 6 – Control Structures",
    description: "Example 6.2, 6.3, 6.5 — Branching statements in Python.",
    code: `# Example 6.2 — Simple if: Voting eligibility
x = int(input("Enter your age: "))
if x >= 18:
    print("You are eligible for voting")

# Example 6.3 — if..else: Even or Odd
a = int(input("Enter any number: "))
if a % 2 == 0:
    print(a, "is an even number")
else:
    print(a, "is an odd number")

# Example 6.4 — One-line if..else (ternary)
a = int(input("Enter any number: "))
x = "even" if a % 2 == 0 else "odd"
print(a, "is", x)

# Example 6.5 — if..elif..else: Grade Calculator
m1 = int(input("Enter mark in first subject : "))
m2 = int(input("Enter mark in second subject: "))
avg = (m1 + m2) / 2
if avg >= 80:
    print("Grade : A")
elif avg >= 70 and avg < 80:
    print("Grade : B")
elif avg >= 60 and avg < 70:
    print("Grade : C")
elif avg >= 50 and avg < 60:
    print("Grade : D")
else:
    print("Grade : E")`,
  },
  75: {
    title: "Ch.6 · while Loop & for Loop",
    language: "python",
    chapter: "Chapter 6 – Control Structures",
    description: "Example 6.6–6.13 — Looping constructs: while, for, nested.",
    code: `# Example 6.6 — while loop: print 10 to 15
i = 10
while (i <= 15):
    print(i, end='\t')
    i = i + 1
# Output: 10  11  12  13  14  15

# Example 6.7 — while with else
i = 10
while (i <= 15):
    print(i, end='\t')
    i = i + 1
else:
    print("\nValue of i when loop exits:", i)
# Output: 10 11 12 13 14 15 / Value of i: 16

# Example 6.9 — for loop with range()
for i in range(2, 10, 2):
    print(i, end=' ')
# Output: 2 4 6 8

# Example 6.11 — Sum of 1 to 100
n = 100
sum_total = 0
for counter in range(1, n + 1):
    sum_total = sum_total + counter
print("Sum of 1 until %d: %d" % (n, sum_total))
# Output: Sum of 1 until 100: 5050

# Example 6.13 — Nested loops: number triangle
i = 1
while (i <= 6):
    for j in range(1, i):
        print(j, end='\t')
    print(end='\n')
    i += 1`,
  },
  81: {
    title: "Ch.6 · break / continue / pass",
    language: "python",
    chapter: "Chapter 6 – Control Structures",
    description: "Example 6.14–6.18 — Jump statements in Python.",
    code: `# Example 6.14 — break: stop loop at 'e'
for word in "Jump Statement":
    if word == "e":
        break
    print(word, end=' ')
# Output: J u m p   S t a t

# Example 6.16 — continue: skip 'e', print rest
for word in "Jump Statement":
    if word == "e":
        continue
    print(word, end=' ')
print("\nEnd of the program")
# Output: J u m p   S t a t m n t

# Example 6.17 — pass: do nothing for zero
a = int(input("Enter any number: "))
if (a == 0):
    pass
else:
    print("non zero value is accepted")

# Example 6.18 — pass as placeholder in loop
for val in "Computer":
    pass
print("End of the loop, loop structure will be built in future")

# Practical: Fibonacci using while
def fibonacci(n):
    a, b = 0, 1
    count = 0
    while count < n:
        print(a, end=' ')
        a, b = b, a + b
        count += 1
fibonacci(10)  # 0 1 1 2 3 5 8 13 21 34`,
  },
  // Ch 7 – Python Functions
  95: {
    title: "Ch.7 · Function Arguments — All Types",
    language: "python",
    chapter: "Chapter 7 – Python Functions",
    description: "Required, Keyword, Default and Variable-length arguments.",
    code: `# 7.5.1 Required Arguments
def printstring(s):
    print("Required arg:", s)
printstring("Welcome")   # Works
# printstring()          # TypeError!

# 7.5.2 Keyword Arguments
def printdata(name, age):
    print("Name:", name)
    print("Age: ", age)
printdata(age=25, name="Gshan")  # order doesn't matter

# 7.5.3 Default Arguments
def printinfo(name, salary=3500):
    print("Name:  ", name)
    print("Salary:", salary)
printinfo("Mani")         # Salary: 3500 (default)
printinfo("Ram", 2000)    # Salary: 2000 (overrides)

# 7.5.4 Variable-Length Arguments
def printnos(*nos):
    for n in nos:
        print(n)
print('Printing two values:')
printnos(1, 2)
print('Printing three values:')
printnos(10, 20, 30)

# 7.6 Lambda (Anonymous) Functions
sum_fn = lambda arg1, arg2: arg1 + arg2
print('The Sum is:', sum_fn(30, 40))    # 70
print('The Sum is:', sum_fn(-30, 40))   # 10`,
  },
  99: {
    title: "Ch.7 · return Statement & Scope",
    language: "python",
    chapter: "Chapter 7 – Python Functions",
    description: "return statement, absolute value function, local vs global scope.",
    code: `# 7.7.1 return Statement — user-defined abs()
def usr_abs(n):
    if n >= 0:
        return n
    else:
        return -n

x = int(input("Enter a number: "))
print(usr_abs(x))
# Input: 25  → Output: 25
# Input: -25 → Output: 25

# 7.8.1 Local Scope
def loc():
    y = 0    # local variable
    print(y)
loc()        # Output: 0
# print(y)   # NameError: y not defined outside

# 7.8.2 Global Scope
c = 1         # global variable
def add():
    print(c)
add()         # Output: 1

# 7.8.2(c) Modifying global with keyword
x = 0
def add2():
    global x
    x = x + 5
    print("Inside add2():", x)
add2()
print("In main, x =", x)
# Output:
# Inside add2(): 5
# In main, x = 5`,
  },
  // Ch 8 – Strings
  114: {
    title: "Ch.8 · String Basics & Slicing",
    language: "python",
    chapter: "Chapter 8 – Strings and String Manipulation",
    description: "String creation, indexing, slicing — the building blocks.",
    code: `# String definition — single, double, triple quotes
s1 = 'A string defined within single quotes'
s2 = "A string defined within double quotes"
s3 = """Triple quote multiline
string literal"""

# Positive and negative indexing
name = "COMPUTER"
#  Index:  C O M P U T E R
#  Pos:    0 1 2 3 4 5 6 7
#  Neg:   -8-7-6-5-4-3-2-1

# Access individual characters
print(name[0])    # C
print(name[-1])   # R

# Slicing: str[start:end:step]
# Example I: single character
print(name[2:3])       # M

# Example II: substring index 0 to 4
print(name[0:4])       # COMP

# Example III: without beginning
print(name[:4])        # COMP

# Example IV: from start index to end
print(name[4:])        # UTER

# Example V: slicing with for loop
str1 = "COMPUTER SCIENCE"
for i in range(0, len(str1), 3):
    print(str1[i:i+3])`,
  },
  126: {
    title: "Ch.8 · String Programs — Palindrome & Patterns",
    language: "python",
    chapter: "Chapter 8 – Strings and String Manipulation",
    description: "Example 8.11.1–8.11.4 — Palindrome check, star pattern, vowel counter.",
    code: `# Example 8.11.1 — Palindrome check
str1 = input("Enter a string: ")
str2 = ''
index = -1
for i in str1:
    str2 += str1[index]
    index -= 1
print("Original  :", str1)
print("Reversed  :", str2)
if str1 == str2:
    print("The given string is Palindrome")
else:
    print("The given string is NOT a palindrome")
# Input: malayalam → Palindrome ✓
# Input: welcome   → Not a palindrome

# Example 8.11.2 — Star Pattern
str1 = ' * '
i = 1
while i <= 5:
    print(str1 * i)
    i += 1

# Example 8.11.3 — Count vowels and consonants
str1 = input("Enter a string: ")
str2 = "aAeEiIoOuU"
v, c = 0, 0
for i in str1:
    if i in str2:
        v += 1
    elif i.isalpha():
        c += 1
print("Vowels:", v, "| Consonants:", c)
# Input: Tamilnadu School Education → Vowels: 11, Consonants: 13

# Example 8.11.4 — Abecedarian series
str1 = "ABCDEFGH"
str2 = "ate"
for i in str1:
    print((i + str2), end='\t')
# Aate  Bate  Cate  Date  Eate  Fate  Gate  Hate`,
  },
  127: {
    title: "Ch.8 · Remove Vowels & Count Characters",
    language: "python",
    chapter: "Chapter 8 – Strings and String Manipulation",
    description: "Example 8.11.5 & 8.11.6 — Vowel removal and character occurrence count.",
    code: `# Example 8.11.5 — Remove vowels from string
def rem_vowels(s):
    temp_str = ''
    for i in s:
        if i in "aAeEiIoOuU":
            pass    # skip vowel
        else:
            temp_str += i
    print("The string without vowels:", temp_str)

str1 = input("Enter a String: ")
rem_vowels(str1)
# Input:  Mathematical foundations of Computer Science
# Output: Mthmtcl fndtns f Cmptr Scnc

# Example 8.11.6 — Count occurrences of a character
def count(s, c):
    c1 = 0
    for i in s:
        if i == c:
            c1 += 1
    return c1

str1 = input("Enter a String: ")
ch = input("Enter a character to search: ")
result = count(str1, ch)
print(f"'{ch}' appears {result} times in '{str1}'")
# Input: "Computer Science", 'c'
# Output: 'c' appears 2 times (case-sensitive)`,
  },
  // Ch 9 – Lists, Tuples, Sets, Dictionary
  146: {
    title: "Ch.9 · List Programs — Divisibility & BRICS",
    language: "python",
    chapter: "Chapter 9 – Lists, Tuples, Sets and Dictionary",
    description: "Program 1 & 2 — List operations: divisibility filter and membership check.",
    code: `# Program 1 — Numbers 1-20 divisible by 4
divBy4 = []
for i in range(21):
    if (i % 4 == 0):
        divBy4.append(i)
print(divBy4)
# Output: [0, 4, 8, 12, 16, 20]

# Program 2 — BRICS membership check
country = ["India", "Russia", "Srilanka", "China", "Brazil"]
is_member = input("Enter the name of the country: ")
if is_member in country:
    print(is_member, "is the member of BRICS")
else:
    print(is_member, "is not a member of BRICS")
# India    → is the member of BRICS
# Japan    → is not a member of BRICS

# Program 3 — Read marks, display total
marks = []
subjects = ['Tamil', 'English', 'Physics', 'Chemistry', 'Comp. Science', 'Maths']
for i in range(6):
    m = int(input("Enter Mark = "))
    marks.append(m)
for j in range(len(marks)):
    print("{}. {} Mark = {}".format(j+1, subjects[j], marks[j]))
print("Total Marks =", sum(marks))`,
  },
  148: {
    title: "Ch.9 · Employee Salary Counter",
    language: "python",
    chapter: "Chapter 9 – Lists, Tuples, Sets and Dictionary",
    description: "Program 5 — Count employees earning more than 1 lakh per annum.",
    code: `# Program 5 — Count employees earning > 1 lakh/annum
count = 0
n = int(input("Enter no. of employees: "))
print("No. of Employees:", n)
salary = []

for i in range(n):
    print("Enter Monthly Salary of Employee {} Rs.: ".format(i+1))
    s = int(input())
    salary.append(s)

for j in range(len(salary)):
    annual_salary = salary[j] * 12
    print("Annual Salary of Employee {} is: Rs. {}".format(j+1, annual_salary))
    if annual_salary >= 100000:
        count = count + 1

print("{} Employees out of {} are earning more than Rs. 1 Lakh per annum".format(count, n))

# Sample Output (5 employees):
# Employee 1: 3000  × 12 = 36000   ✗
# Employee 2: 9500  × 12 = 114000  ✓
# Employee 3: 12500 × 12 = 150000  ✓
# Employee 4: 5750  × 12 = 69000   ✗
# Employee 5: 8000  × 12 = 96000   ✗
# → 2 Employees earning more than Rs. 1 Lakh`,
  },
  149: {
    title: "Ch.9 · Fibonacci in a List",
    language: "python",
    chapter: "Chapter 9 – Lists, Tuples, Sets and Dictionary",
    description: "Program 7 — Generate Fibonacci series, store in list, find sum.",
    code: `# Program 7 — Fibonacci Series stored in a list
a = -1
b = 1
n = int(input("Enter no. of terms: "))
i = 0
total = 0
Fibo = []

while i < n:
    s = a + b
    Fibo.append(s)
    total += s
    a = b
    b = s
    i += 1

print("Fibonacci Series:", Fibo)
print("Sum of all values:", total)

# For n=10:
# Fibonacci Series: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
# Sum of all values: 88

# Program 6 — Delete even numbers from list
Num = []
for x in range(1, 11):
    Num.append(x)
print("Original list:", Num)
for index, i in enumerate(Num):
    if (i % 2 == 0):
        del Num[index]
print("After deleting evens:", Num)
# After: [1, 3, 5, 7, 9]`,
  },
  // Ch 10 – Classes & Objects
  170: {
    title: "Ch.10 · Classes & Objects",
    language: "python",
    chapter: "Chapter 10 – Python Classes and Objects",
    description: "OOP fundamentals — class definition, __init__, methods, inheritance.",
    code: `# OOP — Classes and Objects
class Hero:
    """Blueprint for a legend."""
    species = "Human (barely)"   # class attribute

    def __init__(self, name: str, power: int, title: str):
        self.name  = name
        self.power = power
        self.title = title
        self._wins = 0

    def challenge(self, opponent) -> str:
        if self.power >= opponent.power:
            self._wins += 1
            return f"{self.name} defeats {opponent.name}. As expected."
        else:
            return f"{opponent.name} wins this round."

    def __repr__(self) -> str:
        return f"<Hero: {self.title} {self.name} | Power: {self.power} | Wins: {self._wins}>"

# Create instances
nero   = Hero("Nero",   99, "The Undisputed")
rival  = Hero("Shadow", 75, "The Challenger")

print(nero.challenge(rival))   # Nero defeats Shadow. As expected.
print(nero)
# <Hero: The Undisputed Nero | Power: 99 | Wins: 1>

# Inheritance Example
class Student:
    def __init__(self, name, roll):
        self.name = name
        self.roll = roll
    def display(self):
        print(f"Roll: {self.roll}, Name: {self.name}")

class CSStudent(Student):
    def __init__(self, name, roll, lang):
        super().__init__(name, roll)
        self.lang = lang
    def display(self):
        super().display()
        print(f"Language: {self.lang}")

s = CSStudent("Arjun", 101, "Python")
s.display()`,
  },
  // Ch 12 – SQL
  204: {
    title: "Ch.12 · SQL — CREATE TABLE & Constraints",
    language: "sql",
    chapter: "Chapter 12 – Structured Query Language (SQL)",
    description: "CREATE TABLE with NOT NULL, PRIMARY KEY, DEFAULT, and CHECK constraints.",
    code: `-- Create a database
CREATE DATABASE stud;
USE stud;

-- Basic CREATE TABLE
CREATE TABLE Student
(
    Admno  INTEGER,
    Name   CHAR(20),
    Gender CHAR(1),
    Age    INTEGER,
    Place  CHAR(10)
);

-- With constraints
CREATE TABLE Student
(
    Admno  INTEGER  NOT NULL PRIMARY KEY,  -- PK: unique + not null
    Name   CHAR(20) NOT NULL,
    Gender CHAR(1),
    Age    INTEGER  DEFAULT 17,            -- DEFAULT value
    Place  CHAR(10),
    CONSTRAINT chk_age CHECK (Age <= 19)  -- CHECK constraint
);

-- INSERT records
INSERT INTO Student (Admno, Name, Gender, Age, Place)
VALUES (100, 'Ashish', 'M', 17, 'Chennai');

INSERT INTO Student (Admno, Name, Gender, Age, Place)
VALUES (101, 'Adarsh', 'M', 18, 'Delhi');

INSERT INTO Student VALUES (102, 'Akshith', 'M', 17, 'Bangalore');

-- UPDATE record
UPDATE Student SET Age = 20 WHERE Place = 'Bangalore';

-- DELETE record
DELETE FROM Student WHERE Admno = 104;`,
  },
  212: {
    title: "Ch.12 · SQL — SELECT Queries",
    language: "sql",
    chapter: "Chapter 12 – Structured Query Language (SQL)",
    description: "SELECT with WHERE, DISTINCT, AND/OR, ORDER BY clauses.",
    code: `-- View all records
SELECT * FROM Student;

-- View specific columns
SELECT Admno, Name FROM Student;

-- DISTINCT — eliminate duplicates
SELECT DISTINCT Place FROM Student;
-- Output: Chennai, Delhi, Bangalore (no repeats)

-- WHERE clause — filter rows
SELECT Admno, Name, Place
FROM Student
WHERE Place = 'Chennai';

-- WHERE with comparison
SELECT Admno, Name, Age
FROM Student
WHERE Age >= 18;

-- WHERE with AND
SELECT Admno, Name, Age, Place
FROM Student
WHERE Age >= 18 AND Place = 'Delhi';

-- WHERE with OR
SELECT Admno, Name
FROM Student
WHERE Place = 'Chennai' OR Place = 'Delhi';

-- ORDER BY — sort results
SELECT * FROM Student ORDER BY Name ASC;
SELECT * FROM Student ORDER BY Age DESC;

-- ALTER TABLE — add column
ALTER TABLE Student ADD Address CHAR(25);

-- DROP TABLE
DROP TABLE Student;`,
  },
  // Ch 15 – Data Manipulation through SQL (Python + SQLite)
  280: {
    title: "Ch.15 · Python + SQLite — Create Table & Insert",
    language: "python",
    chapter: "Chapter 15 – Data Manipulation through SQL",
    description: "Example 15.3.2 — Create a SQLite database, table and insert records.",
    code: `# Python + SQLite — Create Table and Insert Records
import sqlite3

# Step 1: Connect to database (creates it if not exists)
connection = sqlite3.connect("Academy.db")

# Step 2: Create cursor
cursor = connection.cursor()

# Step 3: Create table
sql_command = """
CREATE TABLE Student (
    Rollno   INTEGER PRIMARY KEY,
    Sname    VARCHAR(20),
    Grade    CHAR(1),
    gender   CHAR(1),
    Average  DECIMAL(5, 2),
    birth_date DATE
);"""
cursor.execute(sql_command)

# Insert individual records
sql_command = """INSERT INTO Student
(Rollno, Sname, Grade, gender, Average, birth_date)
VALUES (NULL, "Akshay", "B", "M", "87.8", "2001-12-12");"""
cursor.execute(sql_command)

# Insert from a Python list (bulk insert)
student_data = [
    ("BASKAR",  "C", "M", "75.2", "1998-05-17"),
    ("SAJINI",  "A", "F", "95.6", "2002-11-01"),
    ("VARUN",   "B", "M", "80.6", "2001-03-14"),
    ("PRIYA",   "A", "F", "98.6", "2002-01-01"),
    ("TARUN",   "D", "M", "62.3", "1999-02-01"),
]
for p in student_data:
    fmt = """INSERT INTO Student (Rollno, Sname, Grade, gender, Average, birth_date)
VALUES (NULL, "{name}", "{gr}", "{gender}", "{avg}", "{bd}");"""
    cursor.execute(fmt.format(name=p[0], gr=p[1], gender=p[2], avg=p[3], bd=p[4]))

connection.commit()
connection.close()
print("STUDENT TABLE CREATED AND RECORDS ADDED")`,
  },
  283: {
    title: "Ch.15 · Python + SQLite — SELECT Queries",
    language: "python",
    chapter: "Chapter 15 – Data Manipulation through SQL",
    description: "Example 15.4.1 — fetchall(), fetchone(), GROUP BY, ORDER BY, Aggregates.",
    code: `import sqlite3
connection = sqlite3.connect("Academy.db")
cursor = connection.cursor()

# fetchall() — get ALL records
cursor.execute("SELECT * FROM student")
result = cursor.fetchall()
for r in result:
    print(r)
# (1, 'Akshay',  'B', 'M', 87.8, '2001-12-12')
# (2, 'Aravind', 'A', 'M', 92.5, '2000-08-17') ...

# fetchone() — get first record only
cursor.execute("SELECT * FROM student")
res = cursor.fetchone()
print(res)   # (1, 'Akshay', 'B', 'M', 87.8, '2001-12-12')

# GROUP BY — count male and female
cursor.execute("SELECT gender, count(gender) FROM student GROUP BY gender")
print(*cursor.fetchall(), sep="\n")
# ('F', 2)
# ('M', 5)

# ORDER BY — alphabetical
cursor.execute("SELECT Rollno, Sname FROM student ORDER BY Sname")
print(*cursor.fetchall(), sep="\n")

# AVG, MAX, MIN Aggregates
cursor.execute("SELECT AVG(Average) FROM student")
print("Average:", cursor.fetchall())       # [(84.65...,)]

cursor.execute("SELECT Sname, MAX(Average) FROM student")
print("Top student:", cursor.fetchall())   # [('PRIYA', 98.6)]

cursor.execute("SELECT Sname, MIN(Average) FROM student")
print("Lowest avg:", cursor.fetchall())    # [('TARUN', 62.3)]`,
  },
  293: {
    title: "Ch.15 · Python + SQLite — UPDATE & DELETE",
    language: "python",
    chapter: "Chapter 15 – Data Manipulation through SQL",
    description: "Example 15.8 & 15.9 — Updating and deleting records in SQLite via Python.",
    code: `# UPDATE Record — rename 'Priya' to 'Priyanka'
import sqlite3
conn = sqlite3.connect("Academy.db")
conn.execute("UPDATE Student SET Sname = 'Priyanka' WHERE Rollno = '6'")
conn.commit()
print("Total rows updated:", conn.total_changes)

cursor = conn.execute("SELECT * FROM Student")
for row in cursor:
    print(row)
# OUTPUT (after update):
# (6, 'Priyanka', 'A', 'F', 98.6, '2002-01-01')  ← changed

conn.close()

# DELETE Record — remove Rollno 2
conn = sqlite3.connect("Academy.db")
conn.execute("DELETE FROM Student WHERE Rollno = '2'")
conn.commit()
print("Total rows deleted:", conn.total_changes)

cursor = conn.execute("SELECT * FROM Student")
for row in cursor:
    print(row)
# Rollno 2 (Aravind) is gone

conn.close()

# LIST ALL TABLES in database
con = sqlite3.connect('Academy.db')
cursor = con.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())
# [('Student',), ('Appointment',), ('Person',)]`,
  },
  // Ch 16 – Data Visualization
  309: {
    title: "Ch.16 · Matplotlib — Line Chart",
    language: "python",
    chapter: "Chapter 16 – Data Visualization using Pyplot",
    description: "Line chart: population trend, two-line graph with labels and legend.",
    code: `import matplotlib.pyplot as plt

# Basic line plot
plt.plot([1, 2, 3, 4])
plt.show()

# Line chart: Year vs Population
years             = [2014, 2015, 2016, 2017, 2018]
total_populations = [8939007, 8954518, 8960387, 8956741, 8943721]
plt.plot(years, total_populations)
plt.title("Year vs Population in India")
plt.xlabel("Year")
plt.ylabel("Total Population")
plt.show()

# Plotting TWO lines
x  = [1, 2, 3]
y  = [5, 7, 4]
x2 = [1, 2, 3]
y2 = [10, 14, 12]
plt.plot(x,  y,  label='Line 1')
plt.plot(x2, y2, label='Line 2')
plt.xlabel('X-Axis')
plt.ylabel('Y-Axis')
plt.title('LINE GRAPH')
plt.legend()
plt.show()
# plt.xlabel → label for x-axis
# plt.ylabel → label for y-axis
# plt.title  → chart heading
# plt.legend → show line labels`,
  },
  313: {
    title: "Ch.16 · Matplotlib — Bar Chart",
    language: "python",
    chapter: "Chapter 16 – Data Visualization using Pyplot",
    description: "Bar chart: subject marks comparison using plt.bar().",
    code: `import matplotlib.pyplot as plt

# Bar Chart — Subject Marks
labels = ["TAMIL", "ENGLISH", "MATHS", "PHYSICS", "CHEMISTRY", "CS"]
usage  = [79.8, 67.3, 77.8, 68.4, 70.2, 88.5]

# Generate y-positions for the bars
y_positions = range(len(labels))

# Create bar plot
plt.bar(y_positions, usage)

# Set x-axis tick labels
plt.xticks(y_positions, labels)

plt.ylabel("RANGE")
plt.title("MARKS")
plt.show()

# plt.bar(x_positions, heights) — creates vertical bars
# plt.xticks(positions, labels) — label the x-axis ticks

# Horizontal Bar Chart (alternative)
plt.barh(y_positions, usage)
plt.yticks(y_positions, labels)
plt.xlabel("MARKS")
plt.title("SUBJECT COMPARISON")
plt.show()`,
  },
  315: {
    title: "Ch.16 · Matplotlib — Pie Chart",
    language: "python",
    chapter: "Chapter 16 – Data Visualization using Pyplot",
    description: "Pie chart showing student marks distribution across subjects.",
    code: `import matplotlib.pyplot as plt

# Pie Chart — Student Marks Distribution
sizes  = [89, 80, 90, 100, 75]
labels = ["Tamil", "English", "Maths", "Science", "Social"]

# autopct: display percentage on each slice
plt.pie(sizes, labels=labels, autopct="%.2f ")
plt.show()

# OUTPUT: Circular chart with:
# Tamil   → 20.51%
# English → 18.43%
# Maths   → 20.74%
# Science → 23.04%
# Social  → 17.28%

# Enhanced pie chart
colors   = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ff99cc']
explode  = (0.1, 0, 0, 0, 0)    # explode first slice

plt.pie(sizes,
        labels=labels,
        autopct='%1.1f%%',
        colors=colors,
        explode=explode,
        shadow=True,
        startangle=140)
plt.title("Subject-wise Marks Distribution")
plt.show()`,
  },
};

const AVAILABLE_PAGES = Object.keys(BOOK_DATA).map(Number).sort((a, b) => a - b);

// ── SYNTAX HIGHLIGHTER ────────────────────────────────────────────────────────
function highlight(code, lang) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let c = esc(code);

  // strings first
  c = c.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g,
    '<span style="color:#a5d6a7">$1</span>');

  // comments
  c = c.replace(/(#[^\n]*|--[^\n]*|\/\/[^\n]*|\(\*[\s\S]*?\*\))/g,
    '<span style="color:#546e7a;font-style:italic">$1</span>');

  // SQL keywords
  if (lang === "sql") {
    c = c.replace(/\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|DROP|ALTER|ADD|PRIMARY|KEY|NOT|NULL|DEFAULT|CHECK|UNIQUE|DISTINCT|ALL|AND|OR|USE|ORDER|BY|GROUP|HAVING|COUNT|SUM|AVG|MAX|MIN|ASC|DESC|CHAR|INTEGER|VARCHAR|DECIMAL|FLOAT|DATE|MODIFY|CHANGE|COLUMN|TRUNCATE|GRANT|REVOKE|COMMIT|ROLLBACK)\b/g,
      '<span style="color:#80cbc4">$1</span>');
  } else if (lang === "ocaml") {
    c = c.replace(/\b(let|rec|in|if|then|else|fun|match|with|type|and|or|not|true|false|return|while|do|done)\b/g,
      '<span style="color:#c792ea">$1</span>');
  } else {
    // Python / default
    c = c.replace(/\b(def|return|if|elif|else|for|while|in|import|from|class|self|True|False|None|and|or|not|pass|print|range|len|str|int|float|list|dict|set|tuple|input|global|lambda|break|continue|super|None)\b/g,
      '<span style="color:#c792ea">$1</span>');
  }

  // numbers
  c = c.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#f78c6c">$1</span>');

  // function calls
  c = c.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span style="color:#82aaff">$1</span>');

  return c;
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:100,
      background:"rgba(5,5,5,0.9)",backdropFilter:"blur(12px)",
      borderBottom:"1px solid rgba(201,168,76,0.15)",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 2rem",height:"58px",
    }}>
      <span
        style={{ fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:"1.1rem",
          color:"#C9A84C",letterSpacing:"0.25em",cursor:"pointer" }}
        onClick={() => setActive("hero")}
      >NERO</span>
      <div style={{ display:"flex",gap:"1.5rem" }}>
        {[
          { id:"hero",     label:"THE LEGEND" },
          { id:"students", label:"STUDENTS' CORNER" },
          { id:"pdf",      label:"📖 THE BOOK" },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setActive(id)} style={{
            background:"none",border:"none",
            fontFamily:"'Inter',sans-serif",fontSize:"0.65rem",
            letterSpacing:"0.18em",fontWeight:600,cursor:"pointer",
            color: active===id ? "#C9A84C" : "#555",
            borderBottom: active===id ? "1px solid #C9A84C" : "1px solid transparent",
            padding:"4px 0",transition:"color 0.25s",
          }}>{label}</button>
        ))}
      </div>
    </nav>
  );
}

// ── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [vis, setVis] = useState(false);
  const [glow, setGlow] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVis(true), 200);
    const t2 = setTimeout(() => setGlow(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ minHeight:"100vh",background:"#050505",display:"flex",
      flexDirection:"column",alignItems:"center",justifyContent:"center",
      padding:"80px 2rem 4rem",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,
        background:"radial-gradient(ellipse 80% 60% at 50% 40%,rgba(139,26,26,0.07) 0%,transparent 70%)",
        pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:0,left:0,right:0,
        height:"1px",background:"linear-gradient(90deg,transparent,#C9A84C44,transparent)" }} />

      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.6rem",letterSpacing:"0.45em",
        color:"#C9A84C",marginBottom:"2rem",
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(12px)",transition:"all 1s ease 0.1s" }}>
        ── PRESENTING ──
      </div>

      <div style={{ display:"flex",gap:"0.05em",marginBottom:"1.5rem" }}>
        {"NERO".split("").map((l, i) => (
          <span key={i} style={{
            fontFamily:"'Cinzel',serif",fontWeight:900,
            fontSize:"clamp(5rem,18vw,13rem)",lineHeight:1,color:"#E8E8E8",
            opacity:vis?1:0,transform:vis?"translateY(0) scaleY(1)":"translateY(60px) scaleY(0.7)",
            transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${0.15+i*0.12}s`,
            textShadow:glow?"0 0 80px rgba(201,168,76,0.25),0 0 160px rgba(201,168,76,0.1)":"none",
            display:"inline-block",
          }}>{l}</span>
        ))}
      </div>

      <div style={{ width:vis?"180px":"0px",height:"1px",
        background:"linear-gradient(90deg,transparent,#C9A84C,transparent)",
        transition:"width 1.2s ease 0.7s",marginBottom:"2.5rem" }} />

      {[
        { text:"THE GREATEST OF ALL TIME.", c:"#555", d:"0.2s" },
        { text:"NOT VOTED. NOT CHOSEN. JUST INEVITABLE.", c:"#555", d:"0.5s" },
        { text:"COMING FOR THE THRONE NOW.", c:"#C9A84C", d:"0.8s" },
      ].map(({ text, c, d }, i) => (
        <p key={i} style={{ fontFamily:"'Cinzel',serif",
          fontSize:"clamp(0.55rem,1.8vw,0.78rem)",letterSpacing:"0.3em",
          color:c,margin:"0.5rem 0",
          opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",
          transition:`all 0.8s ease ${d}` }}>{text}</p>
      ))}

      <div style={{ maxWidth:"680px",textAlign:"center",marginTop:"2rem",
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",
        transition:"all 1s ease 1s" }}>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.85rem,2vw,1rem)",
          lineHeight:1.9,color:"#888",marginBottom:"2.5rem" }}>
          They said the craft had a ceiling.{" "}
          <span style={{ color:"#C9A84C",fontWeight:600 }}>Nero removed it.</span><br />
          A decade of code, a thousand students shaped, and a reputation built not on followers —
          but on <em>results</em>. The kind of teacher who doesn't just explain concepts —
          he makes them <span style={{ color:"#E8E8E8" }}>unforgettable</span>. Full-stack.
          Algorithm-sharp. Pedagogy that hits like a punch dialogue in a blockbuster.<br /><br />
          <span style={{ color:"#C9A84C",fontWeight:600 }}>The undisputed king of the craft.</span>{" "}
          <span style={{ color:"#666" }}>Not a title bestowed — a fact acknowledged.</span>
        </p>
        <div style={{ display:"flex",borderTop:"1px solid #1A1A1A",borderBottom:"1px solid #1A1A1A",
          padding:"1.5rem 0" }}>
          {[
            { label:"Years of Mastery",     value:"10+" },
            { label:"Students Transformed", value:"500+" },
            { label:"Lines of Legend",      value:"∞" },
          ].map(({ label, value }, i) => (
            <div key={i} style={{ flex:1,padding:"0 1.5rem",textAlign:"center",
              borderRight:i<2?"1px solid #1A1A1A":"none" }}>
              <div style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(1.4rem,4vw,2rem)",
                fontWeight:700,color:"#C9A84C",lineHeight:1,marginBottom:"0.4rem" }}>{value}</div>
              <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.6rem",
                letterSpacing:"0.15em",color:"#444",textTransform:"uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PDF VIEWER SECTION ────────────────────────────────────────────────────────
function PDFSection() {
  return (
    <div style={{ minHeight:"100vh",background:"#050505",padding:"80px 0 0",display:"flex",flexDirection:"column" }}>
      <div style={{ textAlign:"center",padding:"2rem 2rem 1.5rem" }}>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.6rem",letterSpacing:"0.45em",
          color:"#8B1A1A",marginBottom:"0.8rem",textTransform:"uppercase" }}>── THE SOURCE ──</p>
        <h2 style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(1.4rem,4vw,2.2rem)",
          fontWeight:700,color:"#E8E8E8",marginBottom:"0.6rem" }}>
          Class 12 Computer Science
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.8rem",color:"#555" }}>
          Tamil Nadu Government Textbook · 2024 Edition · 360 Pages
        </p>
      </div>
      <div style={{ flex:1,margin:"0 1.5rem 1.5rem",border:"1px solid #1A1A1A",
        borderTop:"2px solid #C9A84C",borderRadius:"2px",overflow:"hidden",
        background:"#0A0A0A",minHeight:"78vh" }}>
        <iframe
          src="Class_12_Computer_Science_English_Medium-2024_Edition-www_tntextbooks_in.pdf"
          width="100%"
          height="100%"
          style={{ border:"none",minHeight:"78vh",display:"block" }}
          title="Class 12 Computer Science Textbook"
        />
      </div>
    </div>
  );
}

// ── STUDENTS SECTION ─────────────────────────────────────────────────────────
function StudentsSection() {
  const [query, setQuery]   = useState("");
  const [result, setResult] = useState(null);
  const [state, setState]   = useState("idle");
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState("All");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const chapters = ["All", ...Array.from(new Set(Object.values(BOOK_DATA).map(d => d.chapter)))];

  const filteredPages = AVAILABLE_PAGES.filter(p =>
    filter === "All" || BOOK_DATA[p].chapter === filter
  );

  const handleSearch = () => {
    const pageNum = parseInt(query.trim(), 10);
    if (!pageNum || isNaN(pageNum)) return;
    if (BOOK_DATA[pageNum]) {
      setResult(BOOK_DATA[pageNum]);
      setState("found");
    } else {
      setResult(null);
      setState("notfound");
    }
  };

  const handleQuick = (pg) => {
    setQuery(String(pg));
    setResult(BOOK_DATA[pg]);
    setState("found");
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ minHeight:"100vh",background:"#050505",
      display:"flex",flexDirection:"column",alignItems:"center",
      padding:"100px 1.5rem 6rem",position:"relative" }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"1px",
        background:"linear-gradient(90deg,transparent,#8B1A1A66,transparent)" }} />

      {/* heading */}
      <div style={{ textAlign:"center",marginBottom:"2.5rem",maxWidth:"640px" }}>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.6rem",letterSpacing:"0.45em",
          color:"#8B1A1A",marginBottom:"0.8rem",textTransform:"uppercase" }}>── STUDENTS' CORNER ──</p>
        <h2 style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(1.5rem,5vw,2.6rem)",
          fontWeight:700,color:"#E8E8E8",lineHeight:1.2,margin:"0 0 1rem" }}>
          The Book Code<br /><span style={{ color:"#C9A84C" }}>Oracle</span>
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.85rem",color:"#555",lineHeight:1.8 }}>
          Enter any page number from the{" "}
          <span style={{ color:"#888",fontStyle:"italic" }}>Class 12 Computer Science</span>{" "}
          textbook. Every program, every example — indexed and ready.
        </p>
      </div>

      {/* chapter filter */}
      <div style={{ width:"100%",maxWidth:"820px",marginBottom:"1.5rem",overflowX:"auto" }}>
        <div style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap",justifyContent:"center" }}>
          {chapters.map(ch => (
            <button key={ch} onClick={() => setFilter(ch)} style={{
              background:"none",border:`1px solid ${filter===ch?"#C9A84C":"#1E1E1E"}`,
              borderRadius:"2px",padding:"4px 10px",cursor:"pointer",
              fontFamily:"'Inter',sans-serif",fontSize:"0.55rem",letterSpacing:"0.1em",
              color:filter===ch?"#C9A84C":"#444",transition:"all 0.2s",whiteSpace:"nowrap",
            }}>{ch === "All" ? "ALL CHAPTERS" : ch.split("–")[0].trim()}</button>
          ))}
        </div>
      </div>

      {/* quick-access page chips */}
      <div style={{ width:"100%",maxWidth:"820px",marginBottom:"2rem" }}>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.58rem",letterSpacing:"0.2em",
          color:"#333",marginBottom:"0.7rem",textAlign:"center" }}>QUICK ACCESS — PAGE NUMBERS</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:"0.4rem",justifyContent:"center" }}>
          {filteredPages.map(pg => (
            <button key={pg} onClick={() => handleQuick(pg)} style={{
              background:"none",border:"1px solid #1A1A1A",borderRadius:"2px",
              padding:"3px 10px",cursor:"pointer",
              fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",
              color: result && BOOK_DATA[pg]===result ? "#C9A84C" : "#3A3A3A",
              borderColor: result && BOOK_DATA[pg]===result ? "#C9A84C44" : "#1A1A1A",
              transition:"all 0.15s",
            }}>{pg}</button>
          ))}
        </div>
      </div>

      {/* search input */}
      <div style={{ width:"100%",maxWidth:"520px",marginBottom:"2rem" }}>
        <div style={{ display:"flex",border:"1px solid #222",borderRadius:"2px",
          background:"#0D0D0D",overflow:"hidden",
          boxShadow:"0 0 40px rgba(0,0,0,0.6)" }}>
          <div style={{ padding:"0 1.2rem",display:"flex",alignItems:"center",
            borderRight:"1px solid #1A1A1A" }}>
            <span style={{ fontFamily:"'Cinzel',serif",fontSize:"0.7rem",
              color:"#C9A84C",letterSpacing:"0.1em" }}>PG</span>
          </div>
          <input
            ref={inputRef}
            type="number"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key==="Enter" && handleSearch()}
            placeholder="Enter page number…"
            style={{ flex:1,background:"none",border:"none",outline:"none",
              padding:"1rem 1.2rem",fontFamily:"'Inter',sans-serif",
              fontSize:"1rem",color:"#E8E8E8",caretColor:"#C9A84C" }}
          />
          <button onClick={handleSearch} style={{
            background:"#C9A84C",border:"none",padding:"0 1.8rem",
            fontFamily:"'Cinzel',serif",fontSize:"0.65rem",letterSpacing:"0.2em",
            color:"#050505",fontWeight:700,cursor:"pointer",transition:"background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background="#E8C96A"}
            onMouseLeave={e => e.currentTarget.style.background="#C9A84C"}
          >SEARCH</button>
        </div>
      </div>

      {/* NOT FOUND */}
      {state==="notfound" && (
        <div style={{ maxWidth:"520px",width:"100%",border:"1px solid #8B1A1A44",
          borderLeft:"3px solid #8B1A1A",padding:"1.5rem 2rem",
          background:"rgba(139,26,26,0.06)",borderRadius:"2px" }}>
          <p style={{ fontFamily:"'Cinzel',serif",fontSize:"0.7rem",letterSpacing:"0.2em",
            color:"#8B1A1A",marginBottom:"0.5rem" }}>PAGE NOT FOUND</p>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#666",lineHeight:1.7 }}>
            Even Nero hasn't written a program on this page yet.{" "}
            <span style={{ color:"#444" }}>But mark my words — the day is coming.</span>
          </p>
        </div>
      )}

      {/* FOUND */}
      {state==="found" && result && (
        <div style={{ width:"100%",maxWidth:"860px",border:"1px solid #1E1E1E",
          borderTop:"2px solid #C9A84C",borderRadius:"2px",overflow:"hidden",
          boxShadow:"0 24px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(201,168,76,0.08)",
          animation:"fadeInUp 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
          {/* header */}
          <div style={{ background:"#0D0D0D",borderBottom:"1px solid #1A1A1A",
            padding:"0.8rem 1.5rem",display:"flex",alignItems:"center",
            justifyContent:"space-between",gap:"1rem" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"1.5rem" }}>
              <div style={{ display:"flex",gap:"6px" }}>
                {["#3a1a1a","#2a2a1a","#1a2a1a"].map((c,i) => (
                  <div key={i} style={{ width:10,height:10,borderRadius:"50%",background:c }} />
                ))}
              </div>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif",fontSize:"0.68rem",letterSpacing:"0.15em",
                  color:"#C9A84C",margin:0 }}>{result.title}</p>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.58rem",
                  color:"#3A3A3A",margin:"2px 0 0",letterSpacing:"0.05em" }}>{result.chapter}</p>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.6rem",
                  color:"#444",margin:"2px 0 0" }}>{result.description}</p>
              </div>
            </div>
            <button onClick={handleCopy} style={{
              background:"none",border:"1px solid #2A2A2A",borderRadius:"2px",
              padding:"4px 12px",fontFamily:"'Inter',sans-serif",fontSize:"0.6rem",
              letterSpacing:"0.15em",color:copied?"#C9A84C":"#444",
              cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap",
            }}>{copied ? "COPIED ✓" : "COPY"}</button>
          </div>
          {/* code */}
          <div style={{ background:"#080808",padding:"1.8rem 2rem",overflowX:"auto" }}>
            <pre style={{ margin:0,fontFamily:"'JetBrains Mono','Fira Code',monospace",
              fontSize:"0.8rem",lineHeight:1.8,color:"#C8D3F5" }}
              dangerouslySetInnerHTML={{ __html: highlight(result.code, result.language) }} />
          </div>
          {/* footer */}
          <div style={{ background:"#0A0A0A",borderTop:"1px solid #111",
            padding:"0.5rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.55rem",
              letterSpacing:"0.18em",color:"#222" }}>
              NERO's ARCHIVE · CLASS XII CS · 2024 EDITION
            </span>
            <span style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.58rem",
              color:"#C9A84C44",letterSpacing:"0.1em" }}>
              {result.language.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {state==="idle" && (
        <div style={{ textAlign:"center",marginTop:"1rem" }}>
          <div style={{ width:"40px",height:"1px",background:"#1A1A1A",margin:"0 auto 1rem" }} />
          <p style={{ fontFamily:"'Cinzel',serif",fontSize:"0.6rem",letterSpacing:"0.3em",color:"#222" }}>
            AWAITING YOUR COMMAND
          </p>
        </div>
      )}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("hero");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#050505;color:#E8E8E8;-webkit-font-smoothing:antialiased;}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        @keyframes scrollPulse{0%,100%{opacity:0.2;transform:scaleY(0.7);}50%{opacity:1;transform:scaleY(1);}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
      `}</style>

      <Nav active={active} setActive={setActive} />

      {active === "hero"     && <HeroSection />}
      {active === "students" && <StudentsSection />}
      {active === "pdf"      && <PDFSection />}

      <div style={{ background:"#050505",borderTop:"1px solid #111",padding:"1.5rem 2rem",textAlign:"center" }}>
        <p style={{ fontFamily:"'Cinzel',serif",fontSize:"0.55rem",letterSpacing:"0.35em",color:"#222" }}>
          NERO · THE UNDISPUTED · ALL RIGHTS RESERVED · THE THRONE IS NOT EMPTY
        </p>
      </div>
    </>
  );
}
