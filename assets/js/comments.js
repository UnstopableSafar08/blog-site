const Comments = (() => {

    function escapeHtml(str) {
        if (!str) return '';
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function formatDate(dStr) {
        if (!dStr) return '';
        const d = new Date(dStr.replace(' ', 'T'));
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    // Render the comments section HTML string
    function getCommentsHTML(comments, post) {
        const commentTree = [];
        const commentMap = {};
        
        comments.forEach(c => {
            c.replies = [];
            commentMap[c.id] = c;
        });
        
        comments.forEach(c => {
            if (c.parent_id && commentMap[c.parent_id]) {
                commentMap[c.parent_id].replies.push(c);
            } else {
                // If the parent is missing, treat as top level
                commentTree.push(c);
            }
        });

        function renderCommentNode(c, depth = 0) {
            const avatar = c.author_picture || 'assets/img/user.gif';
            const paddingLeft = depth > 0 ? (depth > 4 ? 4 : depth) * 32 : 0;
            
            let html = `
            <div class="comment-item" style="padding: 16px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 12px; margin-left: ${paddingLeft}px;">
                <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;" onerror="this.src='assets/img/user.gif'">
                        ${escapeHtml(c.author_name)} 
                        <span style="font-size: 0.8rem; color: var(--text-tertiary); font-weight: 400;">${formatDate(c.created_at)}</span>
                    </div>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; margin-bottom: 8px;">${escapeHtml(c.content)}</div>
                <div style="font-size: 0.8rem;">
                    <button onclick="Comments.openReplyForm(${c.id}, '${escapeHtml(c.author_name).replace(/'/g, "\\'")}')" style="background: none; border: none; color: var(--accent); cursor: pointer; padding: 0; font-weight: bold;">Reply</button>
                </div>
            </div>`;
            
            if (c.replies.length > 0) {
                // If the fetch was DESC, replies might be DESC. usually ascending replies are better
                c.replies.reverse().forEach(r => {
                    html += renderCommentNode(r, depth + 1);
                });
            }
            return html;
        }

        const commentsHtml = commentTree.length > 0 
            ? commentTree.map(c => renderCommentNode(c)).join('')
            : `<p style="color: var(--text-tertiary); font-size: 0.95rem; padding: 16px; background: var(--bg-tertiary); border-radius: 8px; text-align: center;">No comments yet. Be the first to share your thoughts!</p>`;

        let inputFormHtml = '';
        if (window.currentGoogleUser) {
            inputFormHtml = `
            <form onsubmit="Comments.submitComment(event, ${post.id}, '${post.slug}')" id="comment-form-container" style="display: flex; flex-direction: column; gap: 16px; background: var(--bg-tertiary); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4 id="comment-form-title" style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                        <img src="${window.currentGoogleUser.picture}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;" onerror="this.src='assets/img/user.gif'"/> 
                        Commenting as ${escapeHtml(window.currentGoogleUser.name)}
                    </h4>
                    <button type="button" id="cancel-reply-btn" onclick="Comments.cancelReply()" style="display: none; background: none; border: none; color: var(--text-tertiary); cursor: pointer; text-decoration: underline; font-size: 0.8rem;">Cancel Reply</button>
                </div>
                <input type="hidden" id="comment-parent-id" value="">
                <div class="form-group" style="margin-bottom: 0;">
                    <textarea id="comment-content" class="form-textarea" placeholder="Write your comment here..." rows="3" required style="background: var(--bg-primary);"></textarea>
                </div>
                <button type="submit" id="comment-submit-btn" class="btn btn-primary" style="align-self: flex-start; padding-left: 24px; padding-right: 24px;">Post Comment</button>
            </form>
            `;
        } else {
            inputFormHtml = `
            <form onsubmit="Comments.submitComment(event, ${post.id}, '${post.slug}')" id="comment-form-container" style="display: flex; flex-direction: column; gap: 16px; background: var(--bg-tertiary); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <h4 id="comment-form-title" style="margin: 0; font-size: 1.1rem;">Leave a Comment</h4>
                    
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <button type="button" id="cancel-reply-btn" onclick="Comments.cancelReply()" style="display: none; background: none; border: none; color: var(--text-tertiary); cursor: pointer; text-decoration: underline; font-size: 0.8rem;">Cancel Reply</button>
                        
                        <!-- Optional Google Sign-In -->
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size:0.8rem; color: var(--text-tertiary);">Or sign in with:</span>
                            <div id="g_id_onload" data-client_id="__GOOGLE_CLIENT_ID__" data-context="signin" data-ux_mode="popup" data-callback="handleGoogleLogin" data-auto_prompt="false"></div>
                            <div class="g_id_signin" data-type="icon" data-shape="circle" data-theme="outline" data-text="signin_with" data-size="medium"></div>
                        </div>
                    </div>
                </div>

                <input type="hidden" id="comment-parent-id" value="">
                
                <div class="form-group" style="margin-bottom: 0;">
                    <input type="text" id="comment-author" class="form-input" placeholder="Your Name" required style="max-width: 300px; background: var(--bg-primary);">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <textarea id="comment-content" class="form-textarea" placeholder="Write your comment here..." rows="3" required style="background: var(--bg-primary);"></textarea>
                </div>
                <button type="submit" id="comment-submit-btn" class="btn btn-primary" style="align-self: flex-start; padding-left: 24px; padding-right: 24px;">Post Comment</button>
            </form>
            `;
        }

        return `
        <div class="post-comments" style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border);">
            <h3 style="margin-bottom: 24px; display: flex; align-items: center; gap: 8px;">Comments <span class="badge badge-general" style="font-size:0.8rem">${comments.length}</span></h3>
            
            <div id="comments-list" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px;">
                ${commentsHtml}
            </div>
            
            <div style="margin-bottom: 32px;">
                ${inputFormHtml}
            </div>
        </div>
        `;
    }

    async function submitComment(e, postId, slug) {
        e.preventDefault();
        
        let author = '';
        let picture = '';
        
        if (window.currentGoogleUser) {
            author = window.currentGoogleUser.name;
            picture = window.currentGoogleUser.picture;
        } else {
            const authorInput = document.getElementById('comment-author');
            author = authorInput ? authorInput.value.trim() : 'Anonymous';
            picture = 'assets/img/user.gif';
        }

        const content = document.getElementById('comment-content').value.trim();
        
        if (!author || !content) {
            if(typeof UI !== 'undefined') UI.showToast('Please fill out your comment', 'error');
            return;
        }
        
        try {
            // Ensure table and new picture/parent_id column exists
            try { await DB.execute("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, author_name TEXT, author_picture TEXT, content TEXT, parent_id INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)", [], true); } catch (err) {}
            // Migration for older tables missing author_picture or parent_id
            try { await DB.execute("ALTER TABLE comments ADD COLUMN author_picture TEXT", [], true); } catch(err) {}
            try { await DB.execute("ALTER TABLE comments ADD COLUMN parent_id INTEGER", [], true); } catch(err) {}

            const parentIdVal = document.getElementById('comment-parent-id').value;
            const finalParentId = parentIdVal ? parseInt(parentIdVal, 10) : null;

            await DB.execute("INSERT INTO comments (post_id, author_name, author_picture, content, parent_id) VALUES (?, ?, ?, ?, ?)", [postId, author, picture, content, finalParentId], true);
            
            if(typeof UI !== 'undefined') UI.showToast('Comment posted successfully!', 'success');
            
            // Re-render
            window.dispatchEvent(new Event('hashchange'));

            // Email notification
            if(typeof EmailService !== 'undefined') {
                const postUrl = window.location.origin + window.location.pathname + '#post/' + slug;
                EmailService.sendCommentNotification(slug, author, content, postUrl);
            }
        } catch (err) {
            if(typeof UI !== 'undefined') UI.showToast('Failed to post comment: ' + err.message, 'error');
        }
    }

    function openReplyForm(parentId, authorName) {
        document.getElementById('comment-parent-id').value = parentId;
        const titleEl = document.getElementById('comment-form-title');
        
        let originalText = titleEl.getAttribute('data-original');
        if(!originalText) {
            originalText = titleEl.innerHTML;
            titleEl.setAttribute('data-original', originalText);
        }
        
        titleEl.innerHTML = window.currentGoogleUser 
            ? `<img src="${window.currentGoogleUser.picture}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;" onerror="this.src='assets/img/user.gif'"/> Replying to ${authorName}` 
            : `Replying to ${authorName}`;
            
        document.getElementById('cancel-reply-btn').style.display = 'block';
        document.getElementById('comment-submit-btn').textContent = 'Post Reply';
        document.getElementById('comment-form-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('comment-content').focus();
    }

    function cancelReply() {
        document.getElementById('comment-parent-id').value = '';
        const titleEl = document.getElementById('comment-form-title');
        titleEl.innerHTML = titleEl.getAttribute('data-original') || 'Leave a Comment';
        document.getElementById('cancel-reply-btn').style.display = 'none';
        document.getElementById('comment-submit-btn').textContent = 'Post Comment';
        document.getElementById('comment-content').value = '';
    }

    return { getCommentsHTML, submitComment, openReplyForm, cancelReply };
})();
