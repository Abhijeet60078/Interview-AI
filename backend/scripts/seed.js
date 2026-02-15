import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';

dotenv.config();

const questionsData = [
  // ===== ARRAYS =====
  { id: 1, title: "Two Sum", description: "Find two numbers that add up to target", difficulty: "easy", company: ["Amazon", "Google", "Meta"], topic: "Arrays", category: "dsa", acceptance: 47.5, likes: 15420, dislikes: 123, leetcodeSlug: "two-sum" },
  { id: 2, title: "Contains Duplicate", description: "Determine if array contains duplicate", difficulty: "easy", company: ["Google"], topic: "Arrays", category: "dsa", acceptance: 56.2, likes: 8932, dislikes: 45, leetcodeSlug: "contains-duplicate" },
  { id: 3, title: "Valid Anagram", description: "Check if two strings are anagrams", difficulty: "easy", company: ["Amazon"], topic: "Strings", category: "dsa", acceptance: 58.5, likes: 7234, dislikes: 123, leetcodeSlug: "valid-anagram" },
  { id: 4, title: "Group Anagrams", description: "Group anagrams together", difficulty: "medium", company: ["Amazon", "Google"], topic: "Hash Table", category: "dsa", acceptance: 52.3, likes: 9876, dislikes: 234, leetcodeSlug: "group-anagrams" },
  { id: 5, title: "Top K Frequent Elements", description: "Return k most frequent elements", difficulty: "medium", company: ["Amazon", "Google"], topic: "Heap", category: "dsa", acceptance: 61.5, likes: 8765, dislikes: 145, leetcodeSlug: "top-k-frequent-elements" },
  
  // ===== C++ =====
  { id: 105, title: "Pointers and Memory Management", description: "Explain pointers, references, and memory allocation", difficulty: "medium", company: ["Microsoft", "Google"], topic: "C++", category: "cpp", solution: "Pointers store memory addresses. Use * for dereferencing and & for address-of operator. Dynamic allocation uses new/delete. Smart pointers manage memory automatically." },
  { id: 106, title: "STL Containers and Algorithms", description: "Compare vector, list, map, set and their use cases", difficulty: "medium", company: ["Amazon", "Microsoft"], topic: "C++", category: "cpp", solution: "Vector: dynamic array (O(1) access). List: doubly-linked list (O(1) insert). Map/Set: balanced BST (O(log n))." },
  
  // ===== OOP =====
  { id: 110, title: "SOLID Principles", description: "Explain Single Responsibility, Open/Closed, Liskov, Interface, Dependency Inversion", difficulty: "hard", company: ["Google", "Amazon", "Meta"], topic: "OOP", category: "oop", solution: "S: One reason to change. O: Open for extension, closed for modification. L: Subtypes must be substitutable. I: Segregate interfaces. D: Depend on abstractions." },
  
  // ===== DBMS =====
  { id: 115, title: "ACID Properties", description: "Explain Atomicity, Consistency, Isolation, Durability", difficulty: "medium", company: ["Amazon", "Google"], topic: "DBMS", category: "dbms", solution: "Atomicity: all-or-nothing. Consistency: valid state to valid state. Isolation: concurrent independence. Durability: persistent after commit." },
  
  // ===== OS =====
  { id: 120, title: "Process vs Thread", description: "Differences, concurrency, and context switching", difficulty: "medium", company: ["Google", "Microsoft", "Amazon"], topic: "OS", category: "os", solution: "Process: isolated, own memory, expensive switch. Thread: shared memory, lightweight, fast switch. Threads need synchronization for shared data." },
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interview-ace';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    // Insert seed data
    const insertedQuestions = await Question.insertMany(questionsData);
    console.log(`✅ Seeded ${insertedQuestions.length} questions`);

    // Verify
    const count = await Question.countDocuments();
    console.log(`📊 Total questions in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
