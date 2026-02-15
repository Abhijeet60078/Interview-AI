import mongoose from 'mongoose';
import Question from '../models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const systemDesignQuestions = [
  {
    id: 5,
    title: "Design Twitter (X)",
    description: `Design a simplified version of Twitter (now X) that supports the following features:

Core Requirements:
• User registration and authentication
• Post tweets (280 characters max)
• Follow/unfollow other users
• News feed generation showing tweets from followed users
• Timeline (user's own tweets)
• Like and retweet functionality

Key Focus Areas:
👉 Feed Generation Algorithm
   - How to efficiently generate a user's feed from thousands of followed users?
   - Real-time vs pre-computed feeds
   - Ranking algorithm for tweet visibility

👉 Scalability Challenges
   - Handle millions of concurrent users
   - Efficient data replication and sharding
   - Caching strategies for hot data
   - Database design for read-heavy workload

Advanced Topics to Cover:
• Fan-out on write vs fan-out on read
• Hot user problem (celebrities with millions of followers)
• Eventual consistency in distributed systems
• CDN for media content (images, videos)
• Rate limiting and spam prevention

Scale Expectations:
• 500M daily active users
• 200M tweets per day
• Average user follows 200 people
• 10% of users are heavy readers`,
    difficulty: "hard",
    company: ["Twitter", "Meta", "Google", "Amazon"],
    topic: "Social Network",
    category: "systemdesign",
    acceptance: 45.0,
    likes: 3500,
    dislikes: 200
  },
  {
    id: 6,
    title: "Design YouTube",
    description: `Design a video sharing platform like YouTube with support for uploading, storing, and streaming videos.

Core Requirements:
• Video upload (support multiple formats)
• Video processing and transcoding
• Video streaming with adaptive bitrate
• Search functionality
• Comments and likes
• Subscription system
• View count tracking

Key Focus Areas:
👉 Video Streaming Architecture
   - How to stream videos efficiently to millions of users?
   - Adaptive bitrate streaming (ABR)
   - Video chunks and protocols (HLS, DASH)
   - Buffering and seek optimization

👉 Content Delivery Network (CDN)
   - Edge server distribution
   - Cache invalidation strategies
   - Geographic load balancing
   - Origin server vs edge cache

Advanced Topics to Cover:
• Video transcoding pipeline (different resolutions: 360p, 480p, 720p, 1080p, 4K)
• Thumbnail generation
• Video recommendation algorithm
• Live streaming vs pre-recorded content
• Copyright detection and content moderation
• Analytics and view tracking

Scale Expectations:
• 2 billion users
• 500 hours of video uploaded per minute
• 1 billion hours watched daily
• 100+ petabytes of storage
• Support 4K video streaming`,
    difficulty: "hard",
    company: ["YouTube", "Netflix", "Meta", "Amazon"],
    topic: "Video Streaming",
    category: "systemdesign",
    acceptance: 38.5,
    likes: 4200,
    dislikes: 300
  },
  {
    id: 7,
    title: "Design Uber",
    description: `Design a ride-sharing service like Uber that connects drivers with passengers.

Core Requirements:
• User registration (Rider and Driver)
• Real-time location tracking
• Ride request and matching
• Fare calculation
• Payment processing
• Rating system
• Ride history

Key Focus Areas:
👉 Real-Time Location Tracking
   - How to track millions of drivers in real-time?
   - Geo-spatial indexing (QuadTree, Geohash, S2)
   - WebSocket vs Server-Sent Events vs Polling
   - Location update frequency optimization

👉 Matching Algorithms
   - How to match riders with nearby available drivers?
   - Dynamic pricing (surge pricing)
   - Route optimization
   - ETA calculation
   - Handling concurrent ride requests

Advanced Topics to Cover:
• Distributed system for global availability
• Push notifications for ride updates
• Map integration (Google Maps API)
• Payment gateway integration
• Fraud detection and prevention
• Driver/rider safety features
• Trip sharing and pooling

Scale Expectations:
• 100 million active users
• 15 million drivers worldwide
• 10 million rides per day
• Peak traffic: 100K concurrent requests
• Sub-second matching requirement`,
    difficulty: "hard",
    company: ["Uber", "Lyft", "DoorDash", "Grab"],
    topic: "Location-Based Services",
    category: "systemdesign",
    acceptance: 42.0,
    likes: 3800,
    dislikes: 250
  },
  {
    id: 8,
    title: "Design a Rate Limiter",
    description: `Design a rate limiting system that controls the rate of traffic sent or received by a client.

Core Requirements:
• Limit requests per user/IP/API key
• Support different time windows (per second, minute, hour, day)
• Provide clear feedback when limit is exceeded
• Handle distributed systems
• Low latency (< 10ms overhead)

Key Focus Areas:
👉 Traffic Control Mechanisms
   - Token Bucket Algorithm
   - Leaky Bucket Algorithm
   - Fixed Window Counter
   - Sliding Window Log
   - Sliding Window Counter

👉 Distributed Systems Challenges
   - How to implement rate limiting across multiple servers?
   - Consistency vs availability trade-off
   - Race conditions in distributed counters
   - Redis vs local cache

Advanced Topics to Cover:
• Rate limiting strategies:
  - User-based rate limiting
  - IP-based rate limiting
  - API endpoint-based limiting
  - Global rate limiting
• Handling edge cases:
  - Clock synchronization issues
  - Burst traffic handling
  - Graceful degradation
• Performance optimization:
  - In-memory cache (Redis, Memcached)
  - Atomic operations
  - Connection pooling
• Monitoring and alerting

Implementation Considerations:
• HTTP 429 (Too Many Requests) response
• Retry-After header
• Rate limit headers (X-RateLimit-*)
• Allowlisting critical services`,
    difficulty: "medium",
    company: ["Google", "Amazon", "Cloudflare", "Stripe"],
    topic: "Distributed Systems",
    category: "systemdesign",
    acceptance: 52.0,
    likes: 2900,
    dislikes: 150
  },
  {
    id: 9,
    title: "Design a Search Engine",
    description: `Design a search engine like Google that can crawl, index, and search billions of web pages.

Core Requirements:
• Web crawling
• Indexing system
• Search query processing
• Ranking algorithm
• Search result display
• Handle typos and autocomplete

Key Focus Areas:
👉 Indexing Architecture
   - Inverted index structure
   - Document ID mapping
   - Index partitioning and sharding
   - Index compression techniques
   - Real-time vs batch indexing

👉 Ranking Algorithm
   - PageRank and link analysis
   - TF-IDF (Term Frequency-Inverse Document Frequency)
   - Query relevance scoring
   - Personalization factors
   - Freshness and authority signals

Advanced Topics to Cover:
• Web Crawler Design:
  - URL frontier management
  - Robots.txt compliance
  - Politeness policy
  - Duplicate content detection
  - Crawl scheduling and prioritization

• Query Processing:
  - Query parsing and normalization
  - Spell correction
  - Query expansion and synonyms
  - Autocomplete and suggestions
  - Boolean and phrase queries

• Performance Optimization:
  - Caching strategies (query cache, document cache)
  - Early termination algorithms
  - Skip lists and posting list compression
  - Distributed query processing

• Additional Features:
  - Image and video search
  - Voice search
  - Featured snippets and knowledge graph
  - Safe search filtering

Scale Expectations:
• Index 50+ billion web pages
• Handle 100K+ queries per second
• Response time < 200ms
• Crawl 1 billion pages per day`,
    difficulty: "hard",
    company: ["Google", "Microsoft", "Amazon", "DuckDuckGo"],
    topic: "Information Retrieval",
    category: "systemdesign",
    acceptance: 35.0,
    likes: 5200,
    dislikes: 400
  }
];

async function seedSystemDesignQuestions() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://khanna:khanna2005@cluster0.ygd0f.mongodb.net/interview-ace?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Delete only system design questions
    console.log('🗑️  Deleting existing system design questions...');
    const deleteResult = await Question.deleteMany({ category: 'systemdesign' });
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing system design questions`);

    // Insert new system design questions
    console.log('📝 Inserting 5 new system design questions...');
    const insertedQuestions = await Question.insertMany(systemDesignQuestions);
    console.log(`✅ Successfully inserted ${insertedQuestions.length} questions:`);
    
    insertedQuestions.forEach((q, index) => {
      console.log(`   ${index + 1}. ${q.title} (${q.difficulty})`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    console.log('📊 Total questions in database:', await Question.countDocuments());
    console.log('📊 System Design questions:', await Question.countDocuments({ category: 'systemdesign' }));
    console.log('📊 DSA questions:', await Question.countDocuments({ category: 'dsa' }));

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
seedSystemDesignQuestions();
