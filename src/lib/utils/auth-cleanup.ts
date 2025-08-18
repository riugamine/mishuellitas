/**
 * Utility functions for complete authentication cleanup
 */

/**
 * Clear all Supabase-related data from browser storage
 * This includes localStorage, sessionStorage, and any known cookie patterns
 */
export function clearAllSupabaseData(): void {
  try {
    // Clear localStorage
    const localKeysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (
        key.startsWith('sb-') || 
        key.includes('supabase') || 
        key.includes('auth-storage')
      )) {
        localKeysToRemove.push(key)
      }
    }
    localKeysToRemove.forEach(key => {
      localStorage.removeItem(key)
      console.log(`🧹 Removed localStorage key: ${key}`)
    })

    // Clear sessionStorage
    const sessionKeysToRemove: string[] = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key && (
        key.startsWith('sb-') || 
        key.includes('supabase') || 
        key.includes('auth-storage')
      )) {
        sessionKeysToRemove.push(key)
      }
    }
    sessionKeysToRemove.forEach(key => {
      sessionStorage.removeItem(key)
    })

  } catch (error) {
    throw error
  }
}

/**
 * Clear all cookies (client-side accessible ones)
 * Note: HttpOnly cookies can only be cleared by the server
 */
export function clearAllCookies(): void {
  try {
    // Get all cookies
    const cookies = document.cookie.split(';')
    
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      
      if (name && (
        name.startsWith('sb-') || 
        name.includes('supabase') || 
        name.includes('auth')
      )) {
        // Clear cookie by setting it to expire in the past
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
        console.log(`🧹 Cleared cookie: ${name}`)
      }
    })
    
  } catch (error) {
    throw error
  }
}

/**
 * Complete authentication cleanup
 * Clears all storage, cookies, and forces page reload
 */
export function completeAuthCleanup(): void {
  
  // Clear all storage
  clearAllSupabaseData()
  
  // Clear all cookies
  clearAllCookies()
  
  // Force reload to ensure clean state
  window.location.href = '/admin'
}
