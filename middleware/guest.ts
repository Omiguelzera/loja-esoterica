import { useAuth } from "@/composables/useAuth.js"
import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"

export default defineNuxtRouteMiddleware((to, from) => {
  // Este middleware roda apenas no cliente
  if (process.server) return

  const { isLoggedIn, checkAuth } = useAuth()
  
  // Verificar autenticação
  checkAuth()
  
  // Se o usuário está logado, redireciona para a página inicial
  if (isLoggedIn.value) {
    return navigateTo('/')
  }
})