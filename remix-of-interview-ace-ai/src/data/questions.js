// Interview questions database
export const questionsData = [
  // ===== DSA =====
  { id: 1, title: "Two Sum", description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.", difficulty: "easy", category: "dsa", company: ["Amazon", "Google", "Meta"], topic: "Arrays", acceptance: 47.5 },
  { id: 2, title: "Contains Duplicate", description: "Given an integer array nums, return true if any value appears at least twice in the array.", difficulty: "easy", category: "dsa", company: ["Google"], topic: "Arrays", acceptance: 56.2 },
  { id: 3, title: "Valid Anagram", description: "Given two strings s and t, return true if t is an anagram of s.", difficulty: "easy", category: "dsa", company: ["Amazon"], topic: "Strings", acceptance: 58.5 },
  { id: 4, title: "Group Anagrams", description: "Given an array of strings strs, group the anagrams together.", difficulty: "medium", category: "dsa", company: ["Amazon", "Google"], topic: "Hash Table", acceptance: 52.3 },
  { id: 5, title: "Top K Frequent Elements", description: "Given an integer array nums and an integer k, return the k most frequent elements.", difficulty: "medium", category: "dsa", company: ["Amazon", "Google"], topic: "Heap", acceptance: 61.5 },
  { id: 6, title: "Merge K Sorted Lists", description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.", difficulty: "hard", category: "dsa", company: ["Google", "Amazon"], topic: "Linked List", acceptance: 42.1 },
  { id: 7, title: "Longest Substring Without Repeating Characters", description: "Given a string s, find the length of the longest substring without repeating characters.", difficulty: "medium", category: "dsa", company: ["Amazon", "Facebook"], topic: "Strings", acceptance: 33.2 },
  { id: 8, title: "Binary Tree Level Order Traversal", description: "Given the root of a binary tree, return the level order traversal of its nodes' values.", difficulty: "medium", category: "dsa", company: ["Google", "Amazon"], topic: "Trees", acceptance: 58.9 },

  // ===== JAVA =====
  { id: 101, title: "Multithreading in Java", description: "Explain multithreading concepts: Thread class, Runnable interface, synchronization, and lock mechanisms", difficulty: "medium", category: "java", company: ["Amazon", "Microsoft"], topic: "Concurrency", acceptance: null },
  { id: 102, title: "Collections Framework", description: "Compare ArrayList vs LinkedList, HashMap vs TreeMap, and their performance characteristics", difficulty: "medium", category: "java", company: ["Google", "Amazon"], topic: "Collections", acceptance: null },
  { id: 103, title: "Exception Handling", description: "Explain checked vs unchecked exceptions, try-catch-finally, and custom exceptions", difficulty: "easy", category: "java", company: ["Amazon"], topic: "Exception Handling", acceptance: null },
  { id: 104, title: "JVM, JRE, and JDK", description: "Explain the differences between JVM, JRE, and JDK", difficulty: "easy", category: "java", company: ["Amazon", "Google"], topic: "Fundamentals", acceptance: null },
  { id: 105, title: "Inheritance and Polymorphism", description: "Explain method overriding, method overloading, super keyword, and interface implementation", difficulty: "medium", category: "java", company: ["Amazon"], topic: "OOP", acceptance: null },

  // ===== MERN =====
  { id: 201, title: "React Hooks", description: "Explain useState, useEffect, useContext, useReducer, useCallback, and useMemo hooks", difficulty: "medium", category: "mern", company: ["Meta", "Google"], topic: "React", acceptance: null },
  { id: 202, title: "Virtual DOM", description: "How does React's Virtual DOM work? Explain reconciliation and diffing algorithm", difficulty: "medium", category: "mern", company: ["Meta", "Amazon"], topic: "React", acceptance: null },
  { id: 203, title: "Async/Await and Promises", description: "Explain Promise, async/await, and error handling in asynchronous JavaScript", difficulty: "medium", category: "mern", company: ["Google", "Amazon"], topic: "JavaScript", acceptance: null },
  { id: 204, title: "MongoDB Aggregation", description: "Explain MongoDB aggregation pipeline, stages like $group, $match, $sort, and $lookup", difficulty: "hard", category: "mern", company: ["Amazon"], topic: "MongoDB", acceptance: null },
  { id: 205, title: "REST API Design", description: "Design RESTful APIs with proper HTTP methods, status codes, and endpoint structure", difficulty: "medium", category: "mern", company: ["Google", "Amazon"], topic: "REST", acceptance: null },

  // ===== PYTHON =====
  { id: 301, title: "Decorators and Context Managers", description: "Explain Python decorators, @property, classmethod, staticmethod, and context managers (with statement)", difficulty: "medium", category: "python", company: ["Google", "Amazon"], topic: "Advanced", acceptance: null },
  { id: 302, title: "List Comprehension and Generators", description: "Explain list comprehensions, generator expressions, yield, and iterators", difficulty: "medium", category: "python", company: ["Amazon"], topic: "Python", acceptance: null },
  { id: 303, title: "Global Interpreter Lock (GIL)", description: "What is the GIL? How does it affect multithreading in Python?", difficulty: "hard", category: "python", company: ["Google"], topic: "Concurrency", acceptance: null },
  { id: 304, title: "Django ORM", description: "Explain Django models, querysets, relationships, migrations, and query optimization", difficulty: "medium", category: "python", company: ["Amazon"], topic: "Django", acceptance: null },
  { id: 305, title: "NumPy and Pandas", description: "Explain NumPy arrays, Pandas DataFrames, data manipulation, and analysis techniques", difficulty: "medium", category: "python", company: ["Google"], topic: "Data Science", acceptance: null },

  // ===== FRONTEND =====
  { id: 401, title: "CSS Box Model", description: "Explain margin, padding, border, content areas. Difference between border-box and content-box", difficulty: "easy", category: "frontend", company: ["Google", "Amazon"], topic: "CSS", acceptance: null },
  { id: 402, title: "Flexbox vs Grid", description: "When to use Flexbox vs CSS Grid? Explain properties and use cases", difficulty: "medium", category: "frontend", company: ["Meta", "Google"], topic: "CSS", acceptance: null },
  { id: 403, title: "Event Delegation", description: "Explain event bubbling, capturing, and event delegation patterns", difficulty: "medium", category: "frontend", company: ["Amazon", "Google"], topic: "JavaScript", acceptance: null },
  { id: 404, title: "Closures and Scope", description: "Explain lexical scope, closure, and variable hoisting in JavaScript", difficulty: "medium", category: "frontend", company: ["Google", "Meta"], topic: "JavaScript", acceptance: null },
  { id: 405, title: "DOM Manipulation", description: "Explain querySelector, addEventListener, createElement, and efficient DOM updates", difficulty: "easy", category: "frontend", company: ["Amazon"], topic: "DOM", acceptance: null },

  // ===== BACKEND =====
  { id: 501, title: "Database Indexing", description: "Explain indexing strategies, B-tree, hash index, compound index, and query optimization", difficulty: "hard", category: "backend", company: ["Google", "Amazon"], topic: "Databases", acceptance: null },
  { id: 502, title: "Microservices Architecture", description: "Advantages and disadvantages of microservices vs monolithic architecture", difficulty: "hard", category: "backend", company: ["Amazon", "Google"], topic: "Architecture", acceptance: null },
  { id: 503, title: "Caching Strategies", description: "LRU cache, Redis, Memcached. Cache invalidation strategies and TTL", difficulty: "medium", category: "backend", company: ["Amazon", "Google"], topic: "Caching", acceptance: null },
  { id: 504, title: "API Authentication", description: "JWT, OAuth 2.0, API keys. Token refresh, secure storage, and best practices", difficulty: "medium", category: "backend", company: ["Google", "Amazon"], topic: "Security", acceptance: null },
  { id: 505, title: "SQL vs NoSQL", description: "ACID vs BASE, relational vs document databases, sharding, and replication", difficulty: "hard", category: "backend", company: ["Amazon", "Google"], topic: "Databases", acceptance: null },
];

export const companies = [
  "Amazon",
  "Google",
  "Meta",
  "Microsoft",
  "Apple",
  "Netflix",
  "Tesla",
  "Uber",
];

export const topics = [
  "Arrays",
  "Strings",
  "Hash Table",
  "Heap",
  "Linked List",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "React",
  "JavaScript",
  "MongoDB",
  "REST",
  "CSS",
  "DOM",
  "Databases",
  "Caching",
  "Architecture",
  "Security",
];

export const getQuestionsByCategory = (category) => {
  return questionsData.filter(q => q.category === category);
};
