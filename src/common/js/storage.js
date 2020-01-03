import storage from 'good-storage'
const SELL_KEY = '__seller__'
const PAGE_KEY = '__page__'
export function saveToLocal(id, key, val){
  const seller = storage.get(SELL_KEY, {})
  if (!seller[id]){
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(SELL_KEY, seller)
}
export function loadFromLocal(id, key, def){
  const seller = storage.get(SELL_KEY, {})
  if (!seller[id]){
    return def
  }
  return seller[id][key] || def
}
export function savePage(key, val){
  const page = storage.get(PAGE_KEY, {})
  page[key] = val
  storage.set(PAGE_KEY, page)
}
export function loadPage(key, def){
  const page = storage.get(PAGE_KEY, {})
  if (!page[key]){
    return def
  }
  return page[key] || def
}
