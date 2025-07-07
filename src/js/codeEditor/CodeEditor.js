import './prism.scss';
import './prism.js';

export default function CodeEditor(id) {
    this.id = id;
    this.code_editor   = {};
    this.editorTabset  = {};
    this.editorTabs    = {};
    this.editorDisplay = {};
    this.editorWindows = {};

    this.init = () => {
        this.code_editor   = document.querySelector(`#${id}.editor`);
        this.editorTabset  = this.code_editor.querySelector('.editor_tabset');
        this.editorTabs    = this.editorTabset.querySelectorAll('li');
        this.editorDisplay = this.code_editor.querySelector('.editor_display');
        this.editorWindows = this.editorDisplay.querySelectorAll('.editor_window');

        const scrollIntoView = false;
        const updateUrl      = true;

        this.editorTabset.addEventListener('click', (e) => {
            const clickedLi = e.target.closest('li');
            if (!clickedLi) return;

            const clickedTab = clickedLi.querySelector('span');
            const targetId   = clickedTab.getAttribute('data-target').replace('#editor_window-', '');

            this.activateTab(targetId, scrollIntoView, updateUrl);
        });

        this.setupDraggable();
        this.onStart();
    }

    this.setupDraggable= () => {
        let isDown = false;
        let startX, scrollLeft;

        this.editorTabset.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - this.editorTabset.offsetLeft;
            scrollLeft = this.editorTabset.scrollLeft;
        });

        this.editorTabset.addEventListener('mouseleave', () => {
            isDown = false;
            this.editorTabset.classList.remove('dragging');
        });

        this.editorTabset.addEventListener('mouseup', () => {
            isDown = false;
            this.editorTabset.classList.remove('dragging');
        });

        this.editorTabset.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            this.editorTabset.classList.add('dragging');
            const x = e.pageX - this.editorTabset.offsetLeft;
            const walk = x - startX;
            this.editorTabset.scrollLeft = scrollLeft - walk;
        });
    }

    this.activateTab = (targetId, scrollIntoView = false, updateUrl = false) => {
        const activeTab      = this.code_editor.querySelector(`span[data-target="${targetId}"]`).closest('li');
        const activeWindow   = this.editorDisplay.querySelector(targetId);
        if (!activeWindow) return;

        this.editorTabs.forEach(tab => {
            const tabSpan    = tab.querySelector('span');
            const dataTarget = tabSpan.getAttribute('data-target');
            const isActive   = dataTarget === targetId;

            tab.removeAttribute('aria-selected');
            if (isActive && scrollIntoView) {
                this.code_editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        
        this.editorWindows.forEach(editorWindow => editorWindow.setAttribute('hidden', ''));
        activeTab.setAttribute('aria-selected', 'true');
        activeWindow.removeAttribute('hidden');

        //if (updateUrl) this.updateUrl(targetId);
    }

    this.onStart = () => {
        const urlParams      = new URLSearchParams(window.location.search);
        const targetEditor   = urlParams.get('tabset');
        const targetTab      = urlParams.get('tab');
        const scrollIntoView = true;

        const firstTab      = this.editorTabs[0].querySelector('span');
        const firstTargetId = firstTab.getAttribute('data-target');

        if (targetTab && targetEditor === this.id) {
            this.activateTab(targetTab, scrollIntoView);
        } else {  
            this.activateTab(firstTargetId); // opens first tab on load
        }
    }

    this.updateUrl = (targetTab) => {
        const url = new URL(window.location);
        url.searchParams.set('tabset', this.id);
        url.searchParams.set('tab', targetTab);
        history.replaceState(null, '', url);
    }
}