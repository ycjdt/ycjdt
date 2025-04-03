/**
 * Enhanced search functionality for ycjdt.com
 * This script handles indexing and searching through blog content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Search elements
    const searchBtn = document.querySelector('.search-button');
    const searchOverlay = document.getElementById('search-overlay');
    const searchCloseBtn = document.querySelector('.search-close-btn');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Check if we're running locally or on a web server
    const isLocalFile = window.location.protocol === 'file:';
    console.log('Running in', isLocalFile ? 'local file mode' : 'web server mode');
    
    // Blog posts data structure with initial content
    let blogPosts = [
        {
            title: "You Can Just... Grift?",
            preview: "Coming Soon...",
            date: "Coming Soon",
            url: "#", // Temporarily disable the link
            isComingSoon: true, // Flag to indicate this is not yet published
            content: "The 'you can just do things' movement has been a breath of fresh air in a world increasingly paralyzed by bureaucracy and risk aversion. It's a call to action, a reminder that progress often comes from those willing to step outside established systems and just build. But as with any movement gaining momentum, there's a shadow side emerging—one where 'you can just do things' transforms into 'you can just... grift?'"
        },
        {
            title: "Why",
            preview: "The world deserves better context.",
            date: "April 02, 2025",
            url: "the-mission.html",
            fullContent: `The "you can just do things" ethos is a splendid mantra. It bubbled up in tech over the last couple of years, almost like a spontaneous rebellion against paralysis-by-analysis and red tape. In these respects, its epistemological backbone can be tied to (roughly) 3 things: e/acc, "screw-the-suits" doers, and libertarianism. Naturally, these are all intrinsically linked. 

        In the last twelve months or so, the third category, libertarians, has taken over the space. Thiel acolytes have populated the current administration with a healthy mix of a16z influence. This isn't necessarily a bad thing and it's certainly not the least bit unprecedented— just think back to Government Sachs or the near constant influence of Covington and Kirkland & Ellis in Democratic and Republican administrations (respectively). The corollary is that it gives these folks immense platforms to alter public thought.`
        }
    ];

    // Full content of blog posts for local testing
    const localBlogContent = {
        "#": `The 'you can just do things' movement has been a breath of fresh air in a world increasingly paralyzed by bureaucracy and risk aversion. It's a call to action, a reminder that progress often comes from those willing to step outside established systems and just build. But as with any movement gaining momentum, there's a shadow side emerging—one where 'you can just do things' transforms into 'you can just... grift?' 
        
        In the last year, we've seen a surge of projects and personalities that leverage the aesthetics and language of the movement while delivering questionable value. From crypto schemes dressed up as innovation to AI tools that promise revolution but deliver mediocrity, the line between genuine building and opportunistic grifting has blurred.
        
        The challenge is that distinguishing between the two isn't always straightforward. Many legitimate builders start with imperfect products, and many grifters are skilled at mimicking the language and appearance of authentic creation. The difference often lies not in the initial offering but in the intent and follow-through.
        
        True builders are characterized by their commitment to iteration, their responsiveness to feedback, and their genuine desire to solve problems. Grifters, by contrast, are more concerned with maintaining appearances than improving substance. They prioritize marketing over development, hype over utility, and quick profits over sustainable value.
        
        This distinction matters because the 'you can just do things' ethos is fundamentally about empowerment and progress. It's about removing unnecessary barriers to creation and innovation. When grifters co-opt this message, they don't just harm individual consumers—they undermine the credibility of the movement itself.
        
        So how do we preserve the spirit of 'you can just do things' while guarding against its exploitation? The answer isn't more gatekeeping or bureaucracy—that would contradict the very essence of the movement. Instead, it requires a more discerning approach from both builders and consumers.
        
        For builders, this means being transparent about limitations, honest about timelines, and committed to delivering real value. It means recognizing that the freedom to build comes with the responsibility to build ethically.
        
        For consumers and investors, it means developing a sharper eye for substance over style. It means asking critical questions: Does this product solve a real problem? Is the team responsive to feedback? Are they more focused on improving their offering or on selling it?
        
        The 'you can just do things' movement has the potential to drive meaningful progress in technology, business, and beyond. But realizing that potential requires distinguishing between those who are genuinely building and those who are just grifting. Because while you can just do things, what you choose to do still matters.`,
        
        "the-mission.html": `The "you can just do things" ethos is a splendid mantra. It bubbled up in tech over the last couple of years, almost like a spontaneous rebellion against paralysis-by-analysis and red tape. In these respects, its epistemological backbone can be tied to (roughly) 3 things: e/acc, "screw-the-suits" doers, and libertarianism. Naturally, these are all intrinsically linked.

        In the last twelve months or so, the third category, libertarians, has taken over the space. Thiel acolytes have populated the current administration with a healthy mix of a16z influence. This isn't necessarily a bad thing and it's certainly not the least bit unprecedented— just think back to Government Sachs or the near constant influence of Covington and Kirkland & Ellis in Democratic and Republican administrations (respectively). The corollary is that it gives these folks immense platforms to alter public thought.
        
        Thus, its influence on the idea that "you can just do things" can and should be judged. On the one hand, libertarianism's core tenets—Hayek's knowledge problem, Locke's ownership of self, or Mises praxeology—are fundamental to the idea that you can just do things. Yet the deep reliance on government, growing grifting, and emerging straitjacket of right-wing intellectual thought echoes much of the same flaws of previous Democratic and "RINO" administrations. Disagreeing with Trump in Republican circles is tantamount to the public flogging one would receive just a couple years ago for violating social justice norms. Simply put, even as the Overton window shifts, we must be careful it does not go too far.
        
        To that end, reading about tech, economics, politics, and understanding how and why progress is made is my passion. As I saw the tech community drift to the right, I also saw the "you can just do things" community emerge. Naturally, it too drifted right. Proponents of liberal democracy and "you can just doing things"—like Paul Graham and Patrick Collison—have been increasingly sidelined, while libertarians like David Sacks and Balaji Srinivasan take the stage. Even former liberals or RINOs (Musk, Andreessen) have drifted far right and become ideologically incoherent, particularly with respect to the freedom they preach; just ask Grok who the largest spreader of misinformation is.
        
        It is exactly because of this shift that I wanted to write about these topics. American libertarianism in its current form is antithetical to both classical libertarianism (a la Tyler Cowen) and the "you can just do things" ethos. The leaders of Palantir (state surveillance), SpaceX (state rockets), Anduril (state weapons), and others should not be able to separate support for liberal democracy from action and doing. In fact, I would argue that liberal democracy and a well functioning progressive state are absolutely critical to the financial success that has platformed these voices. So pieces here are always opinion pieces, and they are always pro-America. I vehemently disagree with Peter Thiel's belief that freedom and democracy are incompatible. Yet I also aim to not dismiss anyone outright. As Alex Karp put it, "progressive but not woke." That is, I don't care what you say, I care what you do. And you can just do things.`
    };

    // Function to fetch and extract content from blog posts
    async function fetchBlogContent() {
        try {
            console.log('Fetching blog content...');
            
            // If running locally, use the embedded content
            if (isLocalFile) {
                console.log('Using embedded content for local testing');
                
                blogPosts.forEach(post => {
                    if (localBlogContent[post.url]) {
                        post.fullContent = localBlogContent[post.url];
                        console.log(`Indexed ${post.title} from local content, length: ${post.fullContent.length}`);
                    } else {
                        console.warn(`No local content available for ${post.url}`);
                    }
                });
                
                // Log debug info about indexed content
                logIndexedContentInfo();
                return;
            }
            
            // If running on a web server, fetch content normally
            const fetchPromises = blogPosts.map(async (post) => {
                try {
                    const response = await fetch(post.url);
                    if (response.ok) {
                        const html = await response.text();
                        const extractedContent = extractContentFromHtml(html);
                        
                        if (extractedContent) {
                            post.fullContent = extractedContent;
                            console.log(`Indexed ${post.title}, content length: ${extractedContent.length}`);
                            
                            // Debug log to check content
                            console.log(`Sample content from ${post.title}: "${extractedContent.substring(0, 100)}..."`);
                        } else {
                            console.warn(`Failed to extract content from ${post.url}`);
                        }
                    } else {
                        console.warn(`Failed to fetch ${post.url}: ${response.status}`);
                    }
                } catch (error) {
                    console.error(`Error processing ${post.url}:`, error);
                }
            });
            
            // Wait for all fetch operations to complete
            await Promise.all(fetchPromises);
            
            console.log('Blog content indexing completed');
            
            // Log debug info about indexed content
            logIndexedContentInfo();
        } catch (error) {
            console.error('Error in fetchBlogContent:', error);
        }
    }
    
    // Helper function to log information about indexed content
    function logIndexedContentInfo() {
        blogPosts.forEach(post => {
            if (post.fullContent) {
                // Log a few test keywords to verify content is indexed
                const testWords = ['economics', 'tech', 'libertarianism', 'democracy', 'progress', 'anduril', 'palantir', 'thiel'];
                testWords.forEach(word => {
                    const found = post.fullContent.toLowerCase().includes(word.toLowerCase());
                    console.log(`${post.title} includes '${word}': ${found}`);
                });
            } else {
                console.warn(`No full content indexed for ${post.title}`);
            }
        });
    }
    
    // Function to extract content from HTML
    function extractContentFromHtml(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Find the article content
            const articleContent = doc.querySelector('.blog-body');
            
            if (!articleContent) {
                console.warn('Could not find .blog-body element in the HTML');
                return null;
            }
            
            // Get all text content directly from the article body
            const fullText = articleContent.textContent || '';
            
            if (!fullText || fullText.trim() === '') {
                console.warn('Extracted empty text from .blog-body');
                return null;
            }
            
            // Also get specific elements for additional weighting
            const paragraphs = articleContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            let content = fullText + ' '; // Start with the full text
            
            // Add specific elements with more weight
            paragraphs.forEach(element => {
                // Add heading content with more weight (by repeating it)
                if (element.tagName.startsWith('H')) {
                    // Add headings multiple times for higher weighting
                    const headingText = element.textContent.trim();
                    content += headingText + ' ' + headingText + ' ' + headingText + ' ';
                } else {
                    // Add paragraph text
                    const paragraphText = element.textContent.trim();
                    content += paragraphText + ' ';
                }
            });
            
            // Clean up the content (remove extra spaces, normalize whitespace)
            content = content.replace(/\s+/g, ' ').trim();
            
            return content;
        } catch (error) {
            console.error('Error in extractContentFromHtml:', error);
            return null;
        }
    }
    
    // Function to create a highlighted preview of the content
    function createHighlightedPreview(content, query, previewLength = 150) {
        if (!content || !query) return content;
        
        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase();
        
        if (lowerContent.includes(lowerQuery)) {
            const index = lowerContent.indexOf(lowerQuery);
            const halfPreviewLength = Math.floor(previewLength / 2);
            
            // Calculate start and end positions for the preview
            const start = Math.max(0, index - halfPreviewLength);
            const end = Math.min(content.length, index + lowerQuery.length + halfPreviewLength);
            
            // Create the preview text with ellipses if needed
            let previewText = '';
            if (start > 0) previewText += '...';
            previewText += content.substring(start, end);
            if (end < content.length) previewText += '...';
            
            return previewText;
        }
        
        // If query not found in content, return a default preview
        return content.substring(0, previewLength) + (content.length > previewLength ? '...' : '');
    }
    
    // Open search popup when search button is clicked
    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
    
    // Close search popup when X is clicked
    searchCloseBtn.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    // Close search popup when clicking outside the popup
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });
    
    // Live search as user types
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query === '') {
            searchResults.innerHTML = '';
            return;
        }
        
        console.log('Searching for:', query);
        
        const filteredPosts = blogPosts.filter(post => {
            // Search in title, preview, and both short and full content
            const inTitle = post.title.toLowerCase().includes(query);
            const inPreview = post.preview.toLowerCase().includes(query);
            const inContent = post.content.toLowerCase().includes(query);
            const inFullContent = post.fullContent && post.fullContent.toLowerCase().includes(query);
            
            // Log for debugging
            if (inFullContent) {
                console.log(`Found "${query}" in full content of "${post.title}"`);
            }
            
            return inTitle || inPreview || inContent || inFullContent;
        });
        
        console.log('Found matches:', filteredPosts.length);
        
        if (filteredPosts.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            searchResults.innerHTML = '';
            
            filteredPosts.forEach(post => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                const link = document.createElement('a');
                link.className = 'search-result-link';
                
                // If the post is marked as coming soon, make it non-clickable
                if (post.isComingSoon) {
                    link.href = 'javascript:void(0)';
                    link.style.cursor = 'default';
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                    });
                } else {
                    link.href = post.url;
                }
                
                const title = document.createElement('h3');
                title.className = 'search-result-title';
                title.textContent = post.title;
                
                // Add a "Coming Soon" badge if the post is not yet published
                if (post.isComingSoon) {
                    const badge = document.createElement('span');
                    badge.className = 'coming-soon-badge';
                    badge.textContent = 'Coming Soon';
                    badge.style.fontSize = '0.7rem';
                    badge.style.backgroundColor = '#e6e9ed';
                    badge.style.color = '#4a6b96';
                    badge.style.padding = '2px 6px';
                    badge.style.borderRadius = '3px';
                    badge.style.marginLeft = '8px';
                    badge.style.fontFamily = "'Space Mono', monospace";
                    title.appendChild(badge);
                }
                
                const preview = document.createElement('p');
                preview.className = 'search-result-preview';
                
                // Determine which content to use for the preview
                let contentToSearch = post.fullContent || post.content;
                
                // Create a preview that highlights the search term
                let previewText = '';
                
                // For coming soon posts, always use the preview text
                if (post.isComingSoon) {
                    previewText = post.preview;
                }
                // Check if query is in the full content
                else if (contentToSearch.toLowerCase().includes(query)) {
                    previewText = createHighlightedPreview(contentToSearch, query, 200);
                } 
                // Check if query is in the title
                else if (post.title.toLowerCase().includes(query)) {
                    previewText = post.preview || contentToSearch.substring(0, 150) + '...';
                }
                // Default to the preview text
                else {
                    previewText = post.preview;
                }
                
                preview.textContent = previewText;
                
                // Add a date element
                const date = document.createElement('span');
                date.className = 'search-result-date';
                date.textContent = post.date;
                
                link.appendChild(title);
                link.appendChild(preview);
                link.appendChild(date);
                resultItem.appendChild(link);
                searchResults.appendChild(resultItem);
            });
        }
    });
    
    // Initialize by fetching blog content
    fetchBlogContent();
}); 