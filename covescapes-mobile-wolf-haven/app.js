'use strict';

const icons = {
  home:'<path d="m3 10 9-7 9 7v10H3zM9 20v-6h6v6"/>',
  notes:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
  star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="m9 3-1 3-3 1-2 4 2 2v4l4 3 3-1 3 1 4-3v-4l2-2-2-4-3-1-1-3z"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  spark:'<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 5h2m4 0h2"/>',
  drive:'<path d="M8 4h8l6 11-4 6H6l-4-6zM8 4l10 17M16 4 6 21M2 15h20"/>',
  design:'<path d="m4 20 4-1L20 7l-3-3L5 16zm10-13 3 3"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18"/>',
  business:'<path d="M3 21h18M5 21V4h9v17m0-12h5v12M8 8h3m-3 4h3m-3 4h3"/>',
  clipboard:'<rect x="5" y="5" width="14" height="16" rx="2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M8 12h8m-8 4h6"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3m-13 5h18m-9-1v3"/>',
  people:'<circle cx="9" cy="7" r="3"/><path d="M2 20v-2a7 7 0 0 1 14 0v2m1-16a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5v2"/>',
  marketing:'<path d="m3 10 16-6v15L3 15zm4 6 2 5h3l-2-4M22 9v5"/>',
  camera:'<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>',
  store:'<path d="M3 9l2-5h14l2 5v3H3zm2 3v8h14v-8m-10 8v-5h6v5"/>',
  bag:'<path d="M5 8h14l2 13H3zm4 0V6a3 3 0 0 1 6 0v2"/>',
  wallet:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M21 10h-6a2 2 0 0 0 0 4h6m-5-2h.1"/>',
  heart:'<path d="M12 20 4 12a5 5 0 0 1 8-6 5 5 0 0 1 8 6z"/>',
  checklist:'<path d="m3 6 2 2 3-4m-5 8 2 2 3-4m-5 8 2 2 3-4m3-10h10m-10 6h10m-10 6h10"/>',
  play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
  cloud:'<path d="M6 18a4 4 0 1 1 1-8 6 6 0 0 1 11 1 3.5 3.5 0 0 1 0 7z"/>',
  map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zm6-2v16m6-14v16"/>',
  school:'<path d="m2 9 10-5 10 5-10 5zm4 2v6a10 10 0 0 0 12 0v-6m4-2v7"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2"/>',
  chevron:'<path d="m5 9 7 7 7-7"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  link:'<path d="m10 14 4-4m-6 6-2 2a3 3 0 0 1-4-4l5-5a3 3 0 0 1 4 0m2 6a3 3 0 0 0 4 0l5-5a3 3 0 0 0-4-4l-2 2"/>'
};

const key = 'otc-covescapes-wolf-mobile-v1';
const format = 'covescapes-wolf-mobile';
const $ = id => document.getElementById(id);
const uid = () => crypto.randomUUID?.() || 'item-' + Date.now().toString(36) + Math.random().toString(36).slice(2);

function defaults() {
  return {
    format, version: 1, brightness: 102, opacity: 82, notes: '', tasks: [], open: [],
    quick: shortcutDefaults.map(([name,url,icon], i) => ({id:'q'+i,name,url,icon})),
    categories: categoryDefaults.map(([name,icon,links], i) => ({
      id:'c'+i, name, icon,
      links: links.map(([name,url], j) => ({id:'c'+i+'l'+j,name,url}))
    })),
    favorites: ['c19l0','c19l1']
  };
}

function website(value) {
  const text = String(value ?? '').trim();
  if (!text || text.length > 2048) throw Error('Enter a website address.');
  const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(text) ? text : 'https://' + text);
  if (!['https:','http:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.')) {
    throw Error('Enter a valid HTTP or HTTPS website.');
  }
  return url.href;
}

const textValue = (value, max) => typeof value === 'string' ? value.slice(0,max) : '';
const iconValue = (value, fallback) => Object.hasOwn(icons,value) ? value : fallback;
const clamp = (value, min, max, fallback) => typeof value === 'number' && Number.isFinite(value)
  ? Math.min(max,Math.max(min,value)) : fallback;

function normalize(data) {
  if (!data || typeof data !== 'object') throw Error('This file is not a CoveScapes backup.');
  const mobile = data.format === format && data.version === 1;
  const desktop = !mobile && [2,3,4].includes(data.version) && Array.isArray(data.categories)
    && (Array.isArray(data.shortcuts) || Array.isArray(data.links));
  if ((!mobile && !desktop) || !Array.isArray(data.categories)) throw Error('This backup format is not supported.');
  const backup = defaults();
  const usedIds = new Set();
  const takeId = id => {
    let safe = textValue(id,120);
    if (!safe || usedIds.has(safe)) safe = uid();
    usedIds.add(safe);
    return safe;
  };
  const links = (items, isQuick) => (Array.isArray(items) ? items : []).flatMap(item => {
    const name = textValue(item?.name ?? item?.label ?? item?.title,100).trim();
    if (!name && !item?.url) return [];
    try {
      const result = {id:takeId(item?.id),name:name || new URL(website(item?.url)).hostname,url:website(item?.url)};
      if (isQuick) result.icon = iconValue(item?.icon,detectIcon(result.url));
      return [result];
    } catch {
      if (mobile) throw Error('A saved link is invalid. Your data was kept.');
      return [];
    }
  });
  backup.categories = data.categories.map(item => {
    const name = textValue(typeof item === 'string' ? item : item?.name,100).trim();
    if (!name) throw Error('A saved category is missing its name.');
    return {
      id:takeId(item?.id),name,icon:iconValue(item?.icon,'business'),
      links:links(typeof item === 'string' ? data.links?.filter(link => link?.cat === name) : item.links,false)
    };
  });
  backup.quick = links(mobile ? data.quick : data.shortcuts ?? data.links?.filter(item => item?.cat === 'Quick Access'),true);
  if (mobile && !Array.isArray(data.quick)) throw Error('The backup is missing its quick-launch list.');
  if (!mobile && !backup.quick.length) backup.quick = defaults().quick;
  backup.notes = textValue(data.notes,50000);
  backup.tasks = (Array.isArray(data.tasks) ? data.tasks : []).flatMap(item => {
    const label = textValue(item?.label,260).trim();
    return label ? [{id:takeId(item.id),label,done:item.done === true}] : [];
  });
  backup.brightness = clamp(data.brightness,55,130,102);
  backup.opacity = clamp(data.opacity,65,97,82);
  const ids = new Set([...backup.quick,...backup.categories.flatMap(c => c.links)].map(item => item.id));
  backup.favorites = Array.isArray(data.favorites) ? [...new Set(data.favorites.filter(id => ids.has(id)))] : [];
  backup.open = Array.isArray(data.open) ? backup.categories.filter(c => data.open.includes(c.id)).map(c => c.id) : [];
  return backup;
}

let state = defaults();
let noticeTimer;
function notify(message, persistent = false) {
  clearTimeout(noticeTimer);
  const node = $('notice');
  node.textContent = message;
  node.hidden = false;
  if (!persistent) noticeTimer = setTimeout(() => { node.hidden = true; },3800);
}

try {
  const stored = localStorage.getItem(key);
  if (stored) state = normalize(JSON.parse(stored));
} catch {
  notify('Saved data could not be opened. Export a backup before making new changes.',true);
}

function save() {
  try {
    localStorage.setItem(key,JSON.stringify(state));
    return true;
  } catch {
    notify('Changes are in memory only. Export a backup before closing.',true);
    return false;
  }
}

function el(tag, value, cls) {
  const node = document.createElement(tag);
  if (value !== undefined) node.textContent = value;
  if (cls) node.className = cls;
  return node;
}

function graphic(name) {
  const node = el('span');
  node.dataset.icon = name;
  node.setAttribute('aria-hidden','true');
  node.innerHTML = '<svg viewBox="0 0 24 24">' + icons[iconValue(name,'link')] + '</svg>';
  return node;
}

function button(text, action, cls) {
  const node = el('button',text,cls);
  node.type = 'button';
  node.addEventListener('click',action);
  return node;
}

function iconButton(icon, label, action, selected = false) {
  const node = button(undefined,action,'icon-button' + (selected ? ' selected' : ''));
  node.setAttribute('aria-label',label);
  node.title = label;
  node.append(graphic(icon));
  return node;
}

function inputField(label, input) {
  const wrapper = el('label',label,'field');
  wrapper.append(input);
  return wrapper;
}

function linkNode(item) {
  const node = el('a',item.name);
  node.href = item.url;
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  return node;
}

function detectIcon(url) {
  const host = new URL(url).hostname.replace(/^www\./,'');
  return shortcutDefaults.find(entry => new URL(entry[1]).hostname.replace(/^www\./,'') === host)?.[2] || 'link';
}

function toggleFavorite(item, control = null) {
  const marked = state.favorites.includes(item.id);
  state.favorites = marked ? state.favorites.filter(id => id !== item.id) : [...state.favorites,item.id];
  const saved = save();
  if (view === 'favorites') {
    renderHome();
    renderSecondary();
    ($('secondary').querySelector('.link-row button') || $('secondary').querySelector('h2')).focus();
  } else if (control) {
    control.classList.toggle('selected',!marked);
    const label = (marked ? 'Add ' : 'Remove ') + item.name + (marked ? ' to Favorites' : ' from Favorites');
    control.setAttribute('aria-label',label);
    control.setAttribute('aria-pressed',String(!marked));
    control.title = label;
  }
  if (saved) notify(marked ? 'Removed from Favorites' : 'Added to Favorites');
}

function linkRow(item) {
  const row = el('div',undefined,'link-row');
  const marked = state.favorites.includes(item.id);
  const label = (marked ? 'Remove ' : 'Add ') + item.name + (marked ? ' from Favorites' : ' to Favorites');
  const favorite = iconButton('star',label,() => toggleFavorite(item,favorite),marked);
  favorite.setAttribute('aria-pressed',String(marked));
  row.append(linkNode(item),favorite);
  return row;
}

function renderHome() {
  $('quick').replaceChildren(...state.quick.map(item => {
    const link = linkNode(item);
    link.prepend(graphic(item.icon));
    return link;
  }));
  const cards = state.categories.map(category => {
    const card = el('details',undefined,'card');
    card.open = state.open.includes(category.id);
    const summary = el('summary');
    summary.append(graphic(category.icon),el('span',category.name),graphic('chevron'));
    const body = el('div',undefined,'card-body');
    if (category.links.length) body.append(...category.links.map(linkRow));
    else body.append(el('p','No websites yet.','muted'));
    body.append(button('Edit websites',() => categoryLinks(category),'quiet'));
    card.append(summary,body);
    card.addEventListener('toggle',() => {
      if (!card.isConnected || state.open.includes(category.id) === card.open) return;
      state.open = card.open ? [...state.open,category.id] : state.open.filter(id => id !== category.id);
      save();
    });
    return card;
  });
  $('categories').replaceChildren(...cards);
}

function applyAppearance() {
  document.documentElement.style.setProperty('--brightness',state.brightness / 100);
  document.documentElement.style.setProperty('--panel',state.opacity / 100);
}

let view = 'home';
let homeScroll = 0;
function showView(next) {
  if (view === 'home') homeScroll = window.scrollY;
  view = next;
  $('home').hidden = view !== 'home';
  $('secondary').hidden = view === 'home';
  document.querySelectorAll('[data-view]').forEach(node => {
    if (node.dataset.view === view) node.setAttribute('aria-current','page');
    else node.removeAttribute('aria-current');
  });
  if (view !== 'home') renderSecondary();
  window.scrollTo(0,view === 'home' ? homeScroll : 0);
}

function section(title) {
  const panel = el('section',undefined,'panel');
  panel.append(el('h3',title));
  return panel;
}

function notesView(root) {
  const notes = section('Personal notes');
  const area = el('textarea');
  area.value = state.notes;
  area.maxLength = 50000;
  area.placeholder = 'Write a note…';
  area.setAttribute('aria-label','Personal notes');
  area.addEventListener('input',() => { state.notes = area.value; save(); });
  notes.append(area,el('p','Changes save on this device.','muted'));

  const tasks = section('To-do list');
  const form = el('form',undefined,'toolbar');
  const input = el('input');
  input.required = true;
  input.maxLength = 260;
  input.placeholder = 'Add a task';
  input.setAttribute('aria-label','New task');
  const add = el('button','Add','primary');
  const list = el('div');
  function drawTasks() {
    list.replaceChildren(...state.tasks.map(task => {
      const row = el('div',undefined,'task-row');
      const label = el('label');
      const box = el('input');
      box.type = 'checkbox';
      box.checked = task.done;
      box.addEventListener('change',() => { task.done = box.checked; save(); });
      label.append(box,el('span',task.label));
      row.append(label,iconButton('close','Delete task ' + task.label,() => {
        state.tasks = state.tasks.filter(item => item.id !== task.id);
        save();
        drawTasks();
        input.focus();
      }));
      return row;
    }));
  }
  form.append(input,add);
  form.addEventListener('submit',event => {
    event.preventDefault();
    const label = input.value.trim();
    if (!label) return;
    state.tasks.push({id:uid(),label,done:false});
    save();
    form.reset();
    drawTasks();
    input.focus();
  });
  drawTasks();
  tasks.append(form,list);
  root.append(notes,tasks);
}

function slider(label, property, min, max) {
  const input = el('input');
  input.type = 'range';
  input.min = min;
  input.max = max;
  const transparent = property === 'opacity';
  input.value = transparent ? 100 - state[property] : state[property];
  const wrapper = inputField('',input);
  const output = el('span',label + ' · ' + input.value + '%');
  wrapper.prepend(output);
  input.addEventListener('input',() => {
    state[property] = transparent ? 100 - Number(input.value) : Number(input.value);
    output.textContent = label + ' · ' + input.value + '%';
    applyAppearance();
    save();
  });
  return wrapper;
}

function exportBackup() {
  const file = new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(file);
  const anchor = el('a');
  anchor.href = url;
  anchor.download = 'Wolf-Haven-backup-' + new Date().toISOString().slice(0,10) + '.json';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url),30000);
}

function confirmAction(title, message, actionLabel, action) {
  const content = openDialog(title);
  content.append(el('p',message),toolbar(
    button('Cancel',() => $('dialog').close()),
    button(actionLabel,() => { $('dialog').close(); action(); },'danger')
  ));
}

function replaceState(next, message) {
  state = next;
  const stored = save();
  applyAppearance();
  renderHome();
  renderSecondary();
  if (stored) notify(message);
}

function settingsView(root) {
  const appearance = section('Appearance');
  appearance.append(slider('Background brightness','brightness',55,130),slider('Panel transparency','opacity',3,35));
  const organize = section('Organize');
  organize.append(toolbar(button('Manage categories',manageCategories),button('Edit quick launch',manageQuick)));

  const backup = section('Backup and restore');
  const file = el('input');
  file.type = 'file';
  file.accept = '.json,application/json';
  file.hidden = true;
  file.addEventListener('change',async () => {
    const selected = file.files[0];
    file.value = '';
    if (!selected) return;
    try {
      if (selected.size > 8 * 1024 * 1024) throw Error('This backup exceeds 8 MB.');
      const imported = normalize(JSON.parse(await selected.text()));
      confirmAction('Import backup','This replaces your current categories, links, notes and settings on this device.','Import backup',() => replaceState(imported,'Backup imported'));
    } catch (error) {
      notify(error instanceof SyntaxError ? 'This file is not valid JSON.' : error.message);
    }
  });
  backup.append(el('p','Back up your links, favorites, notes, tasks and appearance settings to a JSON file.','muted'),
    toolbar(button('Export JSON',exportBackup),button('Import JSON',() => file.click()),file),
    button('Restore defaults',() => confirmAction('Restore defaults','This removes your custom links, favorites, notes and tasks and restores the original setup.','Restore defaults',() => replaceState(defaults(),'Defaults restored')),'danger'));
  const app = section('Offline access');
  app.append(el('p',offlineStatus,'muted'));
  root.append(appearance,organize,backup,app);
}

function renderSecondary() {
  const root = $('secondary');
  const heading = el('h2',{notes:'Notes',favorites:'Favorites',settings:'Settings'}[view]);
  heading.tabIndex = -1;
  root.replaceChildren(heading);
  if (view === 'notes') notesView(root);
  if (view === 'settings') settingsView(root);
  if (view === 'favorites') {
    const items = new Map([...state.quick,...state.categories.flatMap(c => c.links)].map(item => [item.id,item]));
    const panel = el('section',undefined,'panel');
    if (!state.favorites.length) panel.append(el('p','Tap the star next to a website to save it here.','muted'));
    else panel.append(...state.favorites.map(id => items.get(id)).filter(Boolean).map(linkRow));
    root.append(panel);
  }
}

function toolbar(...nodes) {
  const bar = el('div',undefined,'toolbar');
  bar.append(...nodes);
  return bar;
}

function openDialog(title, keepScroll = false) {
  const dialog = $('dialog');
  const pos = keepScroll ? dialog.scrollTop : 0;
  $('dialog-title').textContent = title;
  const content = $('dialog-content');
  content.replaceChildren();
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = pos;
  return content;
}

function moveButtons(list, index, redraw) {
  return [-1,1].map(offset => {
    const other = index + offset;
    const direction = offset < 0 ? 'up' : 'down';
    const control = button(offset < 0 ? '↑' : '↓',() => {
      [list[index],list[other]] = [list[other],list[index]];
      save();
      renderHome();
      redraw(true);
    });
    control.setAttribute('aria-label','Move ' + list[index].name + ' ' + direction);
    control.disabled = other < 0 || other >= list.length;
    return control;
  });
}

function editRow(name, ...actions) {
  const row = el('div',undefined,'edit-row');
  row.append(el('strong',name),...actions);
  return row;
}

function editor(title, submitLabel, renderFields, onSubmit, onCancel) {
  const content = openDialog(title);
  const form = el('form');
  const error = el('p',undefined,'muted');
  error.setAttribute('role','alert');
  const submit = el('button',submitLabel,'primary');
  renderFields(form);
  form.append(error,toolbar(submit,button('Cancel',onCancel)));
  form.addEventListener('submit',event => {
    event.preventDefault();
    try {
      onSubmit(new FormData(form));
    } catch (problem) {
      error.textContent = problem.message;
    }
  });
  content.append(form);
}

function textInput(name, value, max) {
  const node = el('input');
  node.name = name;
  node.value = value || '';
  node.maxLength = max;
  node.required = true;
  return node;
}

function manageCategories(keepScroll = false) {
  const content = openDialog('Manage categories',keepScroll);
  content.append(toolbar(button('Add category',() => editCategory(),'primary')));
  for (const [i,c] of state.categories.entries()) {
    content.append(editRow(c.name,
      button('Websites',() => categoryLinks(c,true)),
      button('Rename',() => editCategory(c)),
      ...moveButtons(state.categories,i,manageCategories),
      button('Delete',() => deleteCategory(c),'danger')
    ));
  }
}

function editCategory(category) {
  editor(category ? 'Rename category' : 'Add category','Save category',form => {
    form.append(inputField('Category name',textInput('name',category?.name,100)));
  }, values => {
    const name = values.get('name').trim();
    if (!name) throw Error('Enter a category name.');
    if (state.categories.some(c => c !== category && c.name.toLowerCase() === name.toLowerCase())) throw Error('A category already uses that name.');
    if (category) category.name = name;
    else state.categories.push({id:uid(),name,icon:'business',links:[]});
    save();
    renderHome();
    manageCategories();
  },manageCategories);
}

function removeFavorites(items) {
  const ids = new Set(items.map(item => item.id));
  state.favorites = state.favorites.filter(id => !ids.has(id));
}

function deleteCategory(category) {
  editor('Delete ' + category.name,'Delete category',form => {
    form.append(el('p',category.links.length ? 'Choose where to move these websites, or delete them with the category.' : 'Delete this category?'));
    if (!category.links.length) return;
    const destination = el('select');
    destination.name = 'destination';
    for (const c of state.categories.filter(item => item !== category)) {
      const option = el('option','Move to ' + c.name);
      option.value = c.id;
      destination.append(option);
    }
    const remove = el('option','Delete its websites');
    remove.value = '';
    destination.append(remove);
    form.append(inputField('Saved websites',destination));
  },values => {
    const destination = state.categories.find(c => c.id === values.get('destination'));
    if (destination) destination.links.push(...category.links);
    else removeFavorites(category.links);
    state.categories = state.categories.filter(c => c !== category);
    state.open = state.open.filter(id => id !== category.id);
    save();
    renderHome();
    manageCategories();
  },manageCategories);
}

function manageQuick(keepScroll = false) {
  linkEditorList(null,keepScroll);
}

function categoryLinks(category, back = false) {
  linkEditorList(category,false,back);
}

function linkEditorList(category, keepScroll, back = false) {
  const title = category?.name || 'Edit quick launch';
  const content = openDialog(title,keepScroll);
  const list = category?.links || state.quick;
  const redraw = preserve => linkEditorList(category,preserve,back);
  const bar = toolbar(button(category ? 'Add website' : 'Add shortcut',() => editLink(category,null,redraw),'primary'));
  if (back) bar.append(button('All categories',() => manageCategories()));
  content.append(bar);
  for (const [index,item] of list.entries()) {
    content.append(editRow(item.name,
      button('Edit',() => editLink(category,item,redraw)),
      ...moveButtons(list,index,redraw),
      button(state.favorites.includes(item.id) ? 'Unfavorite' : 'Favorite',() => {
        toggleFavorite(item);
        redraw(true);
      }),
      button('Delete',() => {
        const confirm = openDialog('Delete ' + item.name);
        confirm.append(el('p','Remove this shortcut?'),toolbar(button('Cancel',() => redraw(false)),
          button('Delete shortcut',() => {
            list.splice(index,1);
            removeFavorites([item]);
            save();
            renderHome();
            redraw(false);
          },'danger')));
      },'danger')));
  }
}

function editLink(category, item, redraw) {
  editor(item ? 'Edit shortcut' : category ? 'Add website' : 'Add shortcut','Save shortcut',form => {
    const address = textInput('url',item?.url,2048);
    address.inputMode = 'url';
    address.autocapitalize = 'off';
    address.spellcheck = false;
    address.placeholder = 'https://example.com';
    form.append(inputField('Name',textInput('name',item?.name,100)),inputField('Website URL',address));
    if (!category) return;
    const select = el('select');
    select.name = 'category';
    for (const c of state.categories) {
      const option = el('option',c.name);
      option.value = c.id;
      select.append(option);
    }
    select.value = category.id;
    form.append(inputField('Category',select));
  },values => {
    const name = values.get('name').trim();
    if (!name) throw Error('Enter a shortcut name.');
    let url;
    try { url = website(values.get('url')); }
    catch { throw Error('Enter a valid website URL, such as https://example.com.'); }
    const link = item || {id:uid()};
    Object.assign(link,{name,url});
    const from = category?.links || state.quick;
    const to = category ? state.categories.find(c => c.id === values.get('category')).links : state.quick;
    if (!category) link.icon = detectIcon(url);
    if (item && from !== to) from.splice(from.indexOf(item),1);
    if (!item || from !== to) to.push(link);
    save();
    renderHome();
    redraw(false);
  },() => redraw(false));
}

function clock() {
  const now = new Date();
  $('clock').textContent = now.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});
  $('clock').dateTime = now.toISOString();
  $('date').textContent = now.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});
  $('date').dateTime = now.toISOString();
}

document.querySelectorAll('[data-icon]').forEach(node => node.replaceWith(graphic(node.dataset.icon)));
document.querySelectorAll('[data-view]').forEach(node => node.addEventListener('click',() => showView(node.dataset.view)));
$('manage').addEventListener('click',() => manageCategories());
$('edit-quick').addEventListener('click',() => manageQuick());
$('close').addEventListener('click',() => $('dialog').close());
$('search').addEventListener('submit',event => {
  if (navigator.onLine) return;
  event.preventDefault();
  notify('Google search needs an internet connection.');
});
document.addEventListener('visibilitychange',clock);
clock();
setInterval(clock,1000);
applyAppearance();
renderHome();

let offlineStatus = 'Preparing the page for offline use…';
function offlineMessage(message) {
  offlineStatus = message;
  if (view === 'settings') {
    const panel = $('secondary').lastElementChild;
    panel.querySelector('p').textContent = message;
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(() => offlineMessage('Ready for offline use. External websites still need a connection.'))
    .catch(() => offlineMessage('Offline setup failed. Reopen this page with an internet connection to retry.'));
} else {
  offlineMessage('Offline access requires a supported browser and an HTTPS address.');
}
