import { useAuth } from "@/composables/useAuth.js"
import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"

export default defineNuxtRouteMiddleware((to, from) => {
  // Este middleware roda apenas no cliente
  if (process.server) return

  const { isLoggedIn, isAdmin, checkAuth } = useAuth()
  
  // Verificar autenticação
  checkAuth()
  
  // Se não estiver logado ou não for admin, redirecionar
  if (!isLoggedIn.value || !isAdmin.value) {
    return navigateTo('/')
  }
})