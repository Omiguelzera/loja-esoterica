import { defineEventHandler, getQuery, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const width = query.width || 400
  const height = query.height || 400
  
  // Redirect to placeholder service
  return sendRedirect(event, `https://picsum.photos/${width}/${height}`, 302)
})