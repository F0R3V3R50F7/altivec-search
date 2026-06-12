/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2026 Technologyst Labs
 *
 * ALTIVEC \u2014 "God Says" widget. A self-contained random word oracle.
 * Loaded by index.html. No external dependencies; wires itself to #godWidget
 * on load. ES3-only, for Safari Leopard WebKit / Aquafox.
 */
(function () {
    // ── GOD SAYS (unchanged) ──
    var GOD_WORDS = ['Grace','Mercy','Salvation','Repentance','Holiness','Sanctification','Justification','Redemption','Atonement','Perfection','Wesley','Whitefield','Methodism','Revival','Conviction','The Blood','The Cross','The Lamb','The Risen Lord','Emmanuel','Abba Father','Holy Ghost','Born Again','New Creation','Assurance','Repent','Believe','Be Holy','Fear God','Love thy neighbour','God is Love','Perfect Love','Pure Heart','Free Grace','Saving Faith','Amen','Alleluia','Maranatha','Selah','Hallelujah','Even so come Lord Jesus','He is risen','It is finished','Come Lord Jesus','The Lord reigneth','King of Kings','Lord of Lords','Worthy is the Lamb','Alpha and Omega','The Word Made Flesh','God With Us','Prince of Peace','The Good Shepherd','The Bread of Life','The True Vine','The Morning Star','Fear not','Be not afraid','Peace be still','Come unto me','I will give you rest','My grace is sufficient','He careth for you','With God all things are possible','I am with you always','The Lord is my shepherd','I shall not want','Still waters','Valley of the shadow of death','I will fear no evil','Holy holy holy','Lord God Almighty','Worthy is the Lamb','Three in One','One in Three','Love one another','Greater love hath no man','God so loved the world','Whosoever believeth','Shall not perish','Blessed are the meek','Blessed are the pure in heart','Blessed are the peacemakers','Salt of the earth','Light of the world','Love your enemies','Turn the other cheek','Judge not','The narrow way','The strait gate','Few there be that find it','Built upon the rock','Seek ye first','Ask seek knock','Go ye into all the world','Preach the gospel','Lazarus come forth','Rise take up thy bed','Thy sins are forgiven','Neither do I condemn thee','The harvest is plenteous','The labourers are few','Silver and gold have I none','Rise up and walk','We ought to obey God rather than men','Not ashamed of the gospel','The shield of faith','The helmet of salvation','The sword of the Spirit','Put on the whole armour of God','We wrestle not against flesh and blood','I press toward the mark','Charity never faileth','Through a glass darkly','Face to face','The greatest of these is charity','The fruit of the Spirit','Love joy peace','Bear one another\'s burdens','In due season we shall reap','Faith cometh by hearing','The just shall live by faith','O the depth of the riches','His ways past finding out','For of him and through him and to him','Jesu lover of my soul','Other refuge have I none','Hide me O my Saviour','With the shadow of thy wing','Love divine all loves excelling','Changed from glory into glory','Hark the herald angels sing','God and sinners reconciled','Kindle a flame of sacred love','Humble prayer and fervent praise','The pure celestial fire','O Thou who camest from above','I\'m not dead yet','I\'m the boss','What part of God don\'t you understand','I made it that way','It\'s nice being God','I planned that','You get what you pray for','Catastrophic Success','I\'m grieved','That\'s gonna leave a mark','Watch this','I pity the fool','Rufus!','Its trivial obviously','King of Mars','Got the life'];

    function godSpeak() {
        // Pick phrases until we have two good lines, never more
        var line1 = '', line2 = '', attempts = 0;
        while (!line1 && attempts < 20) {
            var w = GOD_WORDS[Math.floor(Math.random() * GOD_WORDS.length)];
            if (w && w.length <= 28) line1 = w;
            attempts++;
        }
        attempts = 0;
        while (!line2 && attempts < 40) {
            var w = GOD_WORDS[Math.floor(Math.random() * GOD_WORDS.length)];
            if (w && w !== line1 && w.length <= 28) line2 = w;
            attempts++;
        }

        // Fix mid-sentence capitals: lowercase any word that isn't the first
        // and isn't an obvious proper noun (all-caps, or known names)
        function fixCaps(s) {
            return s.replace(/(\S+)/g, function(word, _, offset) {
                if (offset === 0) return word; // keep first word as-is
                // Keep if ALL CAPS (acronym) or starts with known capital names
                if (word === word.toUpperCase() && word.length > 1) return word;
                // Lowercase mid-sentence Title Case words that aren't names
                // (we trust the word list author for proper nouns, only fix obvious ones)
                var lower = ['The','A','An','And','Or','But','In','On','Of','To','By','At','As','Be','Is','Are','Was','With','From','For','Not','No'];
                for (var i = 0; i < lower.length; i++) {
                    if (word === lower[i]) return word.toLowerCase();
                }
                return word;
            });
        }

        // Add a comma between the two lines where it reads naturally
        // (skip comma if line1 ends with punctuation already)
        var l1 = fixCaps(line1);
        var l2 = fixCaps(line2);
        var needsComma = l1 && !/[,;:.!?]$/.test(l1);

        // Line 2 is always a continuation (comma joins them), so lowercase its first word too
        function lcFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
        var html1 = escapeHtml(needsComma ? l1 + ',' : l1);
        var html2 = l2 ? escapeHtml(needsComma ? lcFirst(l2) : l2) : '';

        var el = document.getElementById('godText');
        el.style.opacity = '0';
        setTimeout(function() {
            el.innerHTML = html1 + (html2 ? '<br>' + html2 : '');
            el.className = 'god-text';
            el.style.opacity = '1';
        }, 300);
    }

    document.getElementById('godWidget').onclick = godSpeak;
    setTimeout(godSpeak, 800);
})();
