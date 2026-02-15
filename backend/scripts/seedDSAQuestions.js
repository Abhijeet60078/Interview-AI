import mongoose from 'mongoose';
import Question from '../models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const dsaQuestions = [
  {
    id: 1,
    title: "Longest Palindromic Substring",
    description: `Given a string s, return the longest palindromic substring in s.

A string is palindromic if it reads the same forward and backward.

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Constraints:
• 1 <= s.length <= 1000
• s consist of only digits and English letters.`,
    difficulty: "medium",
    company: ["Amazon", "Microsoft", "Google", "Facebook"],
    topic: "Dynamic Programming",
    category: "dsa",
    acceptance: 32.8,
    likes: 25000,
    dislikes: 1500,
    leetcodeSlug: "longest-palindromic-substring"
  },
  {
    id: 2,
    title: "Median of Two Sorted Arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Constraints:
• nums1.length == m
• nums2.length == n
• 0 <= m <= 1000
• 0 <= n <= 1000
• 1 <= m + n <= 2000
• -10^6 <= nums1[i], nums2[i] <= 10^6`,
    difficulty: "hard",
    company: ["Google", "Amazon", "Microsoft", "Adobe"],
    topic: "Binary Search",
    category: "dsa",
    acceptance: 35.2,
    likes: 23000,
    dislikes: 2500,
    leetcodeSlug: "median-of-two-sorted-arrays"
  },
  {
    id: 3,
    title: "Add Two Numbers",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
• The number of nodes in each linked list is in the range [1, 100].
• 0 <= Node.val <= 9
• It is guaranteed that the list represents a number that does not have leading zeros.`,
    difficulty: "medium",
    company: ["Amazon", "Microsoft", "Facebook", "Apple", "Bloomberg"],
    topic: "Linked List",
    category: "dsa",
    acceptance: 40.1,
    likes: 28000,
    dislikes: 5500,
    leetcodeSlug: "add-two-numbers"
  },
  {
    id: 4,
    title: "Regular Expression Matching",
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

• '.' Matches any single character.
• '*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

Example 3:
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".

Constraints:
• 1 <= s.length <= 20
• 1 <= p.length <= 20
• s contains only lowercase English letters.
• p contains only lowercase English letters, '.', and '*'.
• It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.`,
    difficulty: "hard",
    company: ["Facebook", "Google", "Amazon", "Microsoft", "Uber"],
    topic: "Dynamic Programming",
    category: "dsa",
    acceptance: 27.9,
    likes: 11000,
    dislikes: 1800,
    leetcodeSlug: "regular-expression-matching"
  }
];

async function seedDSAQuestions() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://khanna:khanna2005@cluster0.ygd0f.mongodb.net/interview-ace?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Delete all existing questions
    console.log('🗑️  Deleting all existing questions...');
    const deleteResult = await Question.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing questions`);

    // Insert new DSA questions
    console.log('📝 Inserting 4 new DSA questions...');
    const insertedQuestions = await Question.insertMany(dsaQuestions);
    console.log(`✅ Successfully inserted ${insertedQuestions.length} questions:`);
    
    insertedQuestions.forEach((q, index) => {
      console.log(`   ${index + 1}. ${q.title} (${q.difficulty})`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    console.log('📊 Final count:', await Question.countDocuments());

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  }
}

// Run the seeding function
seedDSAQuestions();
