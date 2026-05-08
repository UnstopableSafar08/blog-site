const Comments = (() => {

    function escapeHtml(str) {
        if (!str) return '';
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function formatDate(dStr) {
        if (!dStr) return '';
        let isoStr = dStr;
        if (dStr.includes(' ') && !dStr.includes('T')) {
            isoStr = dStr.replace(' ', 'T');
        }
        if (!isoStr.endsWith('Z')) {
            isoStr += 'Z';
        }
        const d = new Date(isoStr);
        if (isNaN(d.getTime())) return 'Invalid Date';
        
        return new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kathmandu',
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(d);
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
            const isAdmin = typeof Auth !== 'undefined' && Auth.isAuthenticated();
            
            let reactions = {};
            try { reactions = JSON.parse(c.reactions || '{}'); } catch(e) {}
            
            let html = `
            <div class="comment-item" style="padding: 16px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 12px; margin-left: ${paddingLeft}px;">
                <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;" onerror="this.src='assets/img/user.gif'">
                        ${escapeHtml(c.author_name)} 
                        <span style="font-size: 0.8rem; color: var(--text-tertiary); font-weight: 400;">${formatDate(c.created_at)}</span>
                    </div>
                    ${isAdmin ? `<button onclick="Comments.deleteComment(${c.id}, ${post ? post.id : 'null'}, '${post ? escapeHtml(post.slug || '') : ''}')" style="background: none; border: none; color: #ff4d4f; cursor: pointer; padding: 4px; display: flex; align-items: center;" title="Delete comment"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>` : ''}
                </div>
                <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; margin-bottom: 8px;">${escapeHtml(c.content)}</div>
                <div style="display: flex; align-items: center; gap: 16px; margin-top: 12px;">
                    <div class="comment-reactions" style="display: flex; gap: 8px;">
                        <button onclick="Comments.addReaction(this, ${c.id}, 'like')" style="background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-secondary); border-radius: 12px; padding: 2px 8px; cursor: pointer; font-size: 0.85rem;">👍 ${reactions.like || 0}</button>
                        <button onclick="Comments.addReaction(this, ${c.id}, 'love')" style="background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-secondary); border-radius: 12px; padding: 2px 8px; cursor: pointer; font-size: 0.85rem;">❤️ ${reactions.love || 0}</button>
                        <button onclick="Comments.addReaction(this, ${c.id}, 'sad')" style="background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-secondary); border-radius: 12px; padding: 2px 8px; cursor: pointer; font-size: 0.85rem;">😢 ${reactions.sad || 0}</button>
                        <button onclick="Comments.addReaction(this, ${c.id}, 'unknown')" style="background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-secondary); border-radius: 12px; padding: 2px 8px; cursor: pointer; font-size: 0.85rem;">🤷 ${reactions.unknown || 0}</button>
                    </div>
                    <button onclick="Comments.openReplyForm(${c.id}, '${escapeHtml(c.author_name).replace(/'/g, "\\'")}')" style="background: none; border: none; color: var(--accent); cursor: pointer; padding: 0; font-weight: bold; font-size: 0.8rem;">Reply</button>
                </div>
            </div>`;
            
            if (c.replies.length > 0) {
                c.replies.forEach(r => {
                    html += renderCommentNode(r, depth + 1);
                });
            }
            return html;
        }

        const commentsHtml = commentTree.length > 0 
            ? commentTree.map(c => renderCommentNode(c)).join('')
            : `<p style="color: var(--text-tertiary); font-size: 0.95rem; padding: 16px; background: var(--bg-tertiary); border-radius: 8px; text-align: center;">No comments yet. Be the first to share your thoughts!</p>`;

        let inputFormHtml = '';
        const isAdmin = typeof Auth !== 'undefined' && Auth.isAuthenticated();

        if (isAdmin) {
            const adminName = Auth.getUser().username;
            inputFormHtml = `
            <form onsubmit="Comments.submitComment(event, ${post.id}, '${post.slug}')" id="comment-form-container" style="display: flex; flex-direction: column; gap: 16px; background: var(--bg-tertiary); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4 id="comment-form-title" style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                        <img src="assets/img/admins.gif" onerror="this.src='assets/img/user.gif'" style="width:24px; height:24px; border-radius:50%; object-fit:cover;" /> 
                        Commenting as ${escapeHtml(adminName)} <span class="badge badge-general" style="font-size:0.7rem;"></span>
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
        } else if (window.currentGoogleUser) {
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
        const isAdmin = typeof Auth !== 'undefined' && Auth.isAuthenticated();
        
        if (isAdmin) {
            author = Auth.getUser().username + ' (Admin)';
            picture = 'assets/img/admins.gif';
        } else if (window.currentGoogleUser) {
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
            // Ensure table and new picture/parent_id/reactions column exists
            try { await DB.execute("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, author_name TEXT, author_picture TEXT, content TEXT, parent_id INTEGER, reactions TEXT DEFAULT '{}', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)", [], true); } catch (err) {}
            // Migration for older tables missing author_picture or parent_id or reactions
            try { await DB.execute("ALTER TABLE comments ADD COLUMN author_picture TEXT", [], true); } catch(err) {}
            try { await DB.execute("ALTER TABLE comments ADD COLUMN parent_id INTEGER", [], true); } catch(err) {}
            try { await DB.execute("ALTER TABLE comments ADD COLUMN reactions TEXT DEFAULT '{}'", [], true); } catch(err) {}

            const parentIdVal = document.getElementById('comment-parent-id').value;
            const finalParentId = parentIdVal ? parseInt(parentIdVal, 10) : null;

            await DB.execute("INSERT INTO comments (post_id, author_name, author_picture, content, parent_id) VALUES (?, ?, ?, ?, ?)", [postId, author, picture, content, finalParentId], true);
            
            if(typeof UI !== 'undefined') UI.showToast('Comment posted successfully!', 'success');
            
            // Dynamically refresh comments area without full page jump
            const result = await DB.execute("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC", [postId]);
            const newComments = result.rows || [];
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = Comments.getCommentsHTML(newComments, { id: postId, slug: slug });
            
            const newList = tempDiv.querySelector('#comments-list');
            if (newList) {
                document.getElementById('comments-list').innerHTML = newList.innerHTML;
            }
            
            const countBadge = document.querySelector('.post-comments h3 .badge-general');
            const newBadge = tempDiv.querySelector('.post-comments h3 .badge-general');
            if (countBadge && newBadge) {
                countBadge.textContent = newBadge.textContent;
            }
            
            cancelReply();
            document.getElementById('comment-content').value = '';

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

    async function deleteComment(id, postId, slug) {
        if (!confirm('Are you sure you want to delete this comment?')) return;
        try {
            await DB.execute("DELETE FROM comments WHERE id = ?", [id], true);
            // also optionally delete replies
            await DB.execute("DELETE FROM comments WHERE parent_id = ?", [id], true);
            if(typeof UI !== 'undefined') UI.showToast('Comment deleted', 'success');
            
            if (postId) {
                const result = await DB.execute("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC", [postId]);
                const newComments = result.rows || [];
                
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = Comments.getCommentsHTML(newComments, { id: postId, slug: slug || '' });
                
                const newList = tempDiv.querySelector('#comments-list');
                if (newList) {
                    document.getElementById('comments-list').innerHTML = newList.innerHTML;
                }
                
                const countBadge = document.querySelector('.post-comments h3 .badge-general');
                const newBadge = tempDiv.querySelector('.post-comments h3 .badge-general');
                if (countBadge && newBadge) {
                    countBadge.textContent = newBadge.textContent;
                }
            } else {
                window.dispatchEvent(new Event('hashchange'));
            }
        } catch (err) {
            if(typeof UI !== 'undefined') UI.showToast('Failed to delete comment', 'error');
        }
    }

    async function addReaction(elem, id, type) {
        try {
            try { await DB.execute("ALTER TABLE comments ADD COLUMN reactions TEXT DEFAULT '{}'", [], true); } catch(err) {}

            const res = await DB.execute("SELECT reactions FROM comments WHERE id = ?", [id]);
            if (!res.rows.length) return;
            
            let reactions = {};
            try { reactions = JSON.parse(res.rows[0].reactions || '{}'); } catch(e) {}
            
            reactions[type] = (reactions[type] || 0) + 1;
            await DB.execute("UPDATE comments SET reactions = ? WHERE id = ?", [JSON.stringify(reactions), id], true);
            
            const emojiMap = { like: '👍', love: '❤️', sad: '😢', unknown: '🤷' };
            elem.innerHTML = `${emojiMap[type] || ''} ${reactions[type]}`;
        } catch(err) {
            console.error('Failed to add reaction', err);
            if(typeof UI !== 'undefined') UI.showToast('Failed to log reaction', 'error');
        }
    }

    async function addPostReaction(elem, id, type) {
        try {
            try { await DB.execute("ALTER TABLE posts ADD COLUMN reactions TEXT DEFAULT '{}'", [], true); } catch(err) {}
            
            const res = await DB.execute("SELECT reactions FROM posts WHERE id = ?", [id]);
            if (!res.rows.length) return;
            
            let reactions = {};
            try { reactions = JSON.parse(res.rows[0].reactions || '{}'); } catch(e) {}
            
            reactions[type] = (reactions[type] || 0) + 1;
            await DB.execute("UPDATE posts SET reactions = ? WHERE id = ?", [JSON.stringify(reactions), id], true);
            
            const emojiMap = { like: '👍', love: '❤️', sad: '😢', unknown: '🤷' };
            elem.innerHTML = `${emojiMap[type] || ''} ${reactions[type]}`;
        } catch(err) {
            console.error('Failed to add post reaction', err);
            if(typeof UI !== 'undefined') UI.showToast('Failed to log post reaction', 'error');
        }
    }

    return { getCommentsHTML, submitComment, openReplyForm, cancelReply, deleteComment, addReaction, addPostReaction };
})();
