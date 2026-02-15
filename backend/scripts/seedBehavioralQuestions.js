import mongoose from 'mongoose';
import Question from '../models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const behavioralQuestions = [
  {
    id: 10,
    title: "Tell me about a difficult problem you faced and how you solved it",
    description: `This is a classic behavioral interview question that assesses your problem-solving abilities and resilience.

What the Interviewer is Looking For:
• Your approach to identifying and analyzing problems
• Critical thinking and analytical skills
• Resilience and perseverance in facing challenges
• Problem-solving methodology
• Outcome and lessons learned

How to Structure Your Answer (STAR Method):
**Situation:** Set the context - what was the difficult problem?
**Task:** What was your responsibility or goal?
**Action:** What specific steps did you take to solve the problem?
**Result:** What was the outcome? What did you learn?

Key Elements to Include:
✓ Specific, real example from your experience
✓ Clear explanation of why it was difficult
✓ Detailed problem-solving process
✓ Measurable results or outcomes
✓ Personal growth or lessons learned
✓ How you would approach similar problems now

Common Mistakes to Avoid:
✗ Being too vague or generic
✗ Blaming others for the problem
✗ Not explaining your thought process
✗ Focusing only on the problem, not the solution
✗ Choosing a problem that was too simple

Example Strong Answer Elements:
• "Analyzed the root cause using..."
• "Broke down the problem into smaller components..."
• "Collaborated with team members to brainstorm solutions..."
• "Implemented a solution that resulted in..."
• "This experience taught me the importance of..."`,
    difficulty: "medium",
    company: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    topic: "Problem Solving & Challenges",
    category: "behavioral",
    acceptance: 85.0,
    likes: 4500,
    dislikes: 200
  },
  {
    id: 11,
    title: "Describe a situation where you had to think creatively",
    description: `This question evaluates your innovative thinking and ability to approach challenges with fresh perspectives.

What the Interviewer is Looking For:
• Ability to think outside the box
• Innovation and creativity
• Adaptability to constraints or limitations
• Unique problem-solving approaches
• Initiative and proactivity

How to Structure Your Answer (STAR Method):
**Situation:** What was the challenge that required creative thinking?
**Task:** What constraints or limitations did you face?
**Action:** What creative approach did you take?
**Result:** What was the outcome of your creative solution?

Key Elements to Include:
✓ Specific situation requiring non-traditional thinking
✓ Constraints that made standard solutions insufficient
✓ Your unique or innovative approach
✓ Why your solution was creative/different
✓ Positive results and impact
✓ How creativity added value

What Makes a Solution "Creative":
• Novel approach to a common problem
• Combining ideas from different domains
• Working around significant constraints
• Simplifying a complex process
• Repurposing existing resources
• Finding win-win solutions

Common Mistakes to Avoid:
✗ Describing routine problem-solving as "creative"
✗ Not explaining why the situation required creativity
✗ Taking all credit without acknowledging team input
✗ Choosing an example with unclear results
✗ Being too abstract without concrete details

Example Strong Answer Elements:
• "Instead of the traditional approach, I..."
• "I drew inspiration from..."
• "By looking at the problem from a different angle..."
• "This unconventional solution resulted in..."
• "The creative approach saved X time/money/resources..."`,
    difficulty: "medium",
    company: ["Apple", "Google", "Adobe", "Netflix", "Spotify"],
    topic: "Problem Solving & Challenges",
    category: "behavioral",
    acceptance: 80.0,
    likes: 3800,
    dislikes: 180
  },
  {
    id: 12,
    title: "Have you ever failed at something? What did you learn from it?",
    description: `This question assesses your self-awareness, accountability, and ability to learn from mistakes.

What the Interviewer is Looking For:
• Self-awareness and humility
• Accountability and ownership
• Learning and growth mindset
• Resilience and ability to recover
• How you apply lessons learned
• Maturity in handling failure

How to Structure Your Answer (STAR Method):
**Situation:** What was the project/goal that you failed at?
**Task:** What were you trying to achieve?
**Action:** What went wrong? What was your role?
**Result:** What did you learn? How did you improve?

Key Elements to Include:
✓ Genuine failure with real consequences
✓ Own your part - take responsibility
✓ Explain what went wrong objectively
✓ Specific lessons learned
✓ Concrete changes you made afterward
✓ How it made you better professionally

Choosing the Right Failure:
• Meaningful but not catastrophic
• Shows your role and responsibility
• Demonstrates learning and growth
• Has a redemption arc (how you improved)
• Professional context (not too personal)
• Not too recent or too old

Common Mistakes to Avoid:
✗ Choosing a "humble brag" (not a real failure)
✗ Blaming others or external circumstances
✗ Choosing a failure that raises red flags
✗ Not showing genuine learning
✗ Being defensive or making excuses
✗ Saying "I've never failed" (unrealistic)

Example Strong Answer Elements:
• "I underestimated the complexity of..."
• "In hindsight, I should have..."
• "This taught me the importance of..."
• "Since then, I've implemented..."
• "This failure made me a better professional by..."
• "Now I approach similar situations by..."

What Interviewers Want to Hear:
✓ Accountability: "It was my responsibility..."
✓ Analysis: "Looking back, the root cause was..."
✓ Learning: "This experience taught me..."
✓ Action: "I now make sure to..."
✓ Impact: "This has helped me succeed in..."`,
    difficulty: "medium",
    company: ["Amazon", "Google", "Microsoft", "Meta", "Netflix"],
    topic: "Problem Solving & Challenges",
    category: "behavioral",
    acceptance: 75.0,
    likes: 5200,
    dislikes: 250
  },
  {
    id: 13,
    title: "Tell me about a time you made a mistake",
    description: `This question is similar to the failure question but focuses more on errors in judgment or execution and your recovery.

What the Interviewer is Looking For:
• Honesty and transparency
• Accountability and ownership
• Quick recognition of mistakes
• Corrective actions taken
• Impact management
• Prevention of future mistakes

How to Structure Your Answer (STAR Method):
**Situation:** What was the context of the mistake?
**Task:** What were you supposed to do?
**Action:** What mistake did you make? How did you fix it?
**Result:** What was the outcome? What did you learn?

Key Elements to Include:
✓ Specific, real mistake with clear impact
✓ How you discovered or were informed of the mistake
✓ Immediate actions taken to correct it
✓ Steps to prevent recurrence
✓ Lessons learned and applied
✓ Positive outcome or mitigation

Types of Good Mistakes to Discuss:
• Communication errors that were corrected
• Overlooked details that were caught early
• Assumptions that proved incorrect
• Underestimated project complexity
• Missed deadlines and how you recovered
• Technical errors that taught valuable lessons

Common Mistakes to Avoid:
✗ Choosing a mistake with severe consequences
✗ Not explaining how you fixed it
✗ Blaming others or circumstances
✗ Making it sound like not a real mistake
✗ Choosing something that questions your competence
✗ Not showing what you learned

Example Strong Answer Elements:
• "I realized I had made an error when..."
• "I immediately took action by..."
• "To prevent this from happening again, I..."
• "I communicated transparently with..."
• "The situation was resolved by..."
• "This taught me to always..."
• "Now I have a system/process to..."

Recovery and Mitigation:
✓ Caught the error quickly
✓ Informed relevant stakeholders promptly
✓ Proposed and implemented solutions
✓ Took ownership without excuses
✓ Put safeguards in place
✓ Documented lessons learned

What Makes a Good Answer:
• Honest but not damaging
• Shows quick problem recognition
• Demonstrates accountability
• Highlights corrective action
• Proves you learned from it
• Shows professional maturity

Red Flags to Avoid:
✗ "I once deleted the production database..."
✗ "I never make mistakes" (unrealistic)
✗ "It wasn't really my fault because..."
✗ Mistakes that show poor judgment
✗ Recent, unresolved mistakes`,
    difficulty: "medium",
    company: ["Amazon", "Google", "Microsoft", "Apple", "Meta"],
    topic: "Problem Solving & Challenges",
    category: "behavioral",
    acceptance: 82.0,
    likes: 4100,
    dislikes: 190
  }
];

async function seedBehavioralQuestions() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://khanna:khanna2005@cluster0.ygd0f.mongodb.net/interview-ace?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Insert new behavioral questions
    console.log('📝 Inserting 4 behavioral questions...');
    const insertedQuestions = await Question.insertMany(behavioralQuestions);
    console.log(`✅ Successfully inserted ${insertedQuestions.length} questions:`);
    
    insertedQuestions.forEach((q, index) => {
      console.log(`   ${index + 1}. ${q.title} (${q.difficulty})`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    console.log('📊 Total questions in database:', await Question.countDocuments());
    console.log('📊 Behavioral questions:', await Question.countDocuments({ category: 'behavioral' }));
    console.log('📊 DSA questions:', await Question.countDocuments({ category: 'dsa' }));
    console.log('📊 System Design questions:', await Question.countDocuments({ category: 'systemdesign' }));

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
seedBehavioralQuestions();
