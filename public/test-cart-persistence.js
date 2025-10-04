/**
 * Teste da Persistência do Carrinho
 * 
 * Como testar:
 * 1. Abra http://localhost:3000
 * 2. Adicione alguns produtos ao carrinho
 * 3. Recarregue a página (F5)
 * 4. Verifique se os itens ainda estão no carrinho
 * 5. Abra o DevTools > Application > Local Storage
 * 6. Procure pela chave 'esoterica_cart_v1'
 * 
 * Se a persistência estiver funcionando:
 * - Os itens permanecerão no carrinho após recarregar
 * - Haverá uma entrada no localStorage com os dados do carrinho
 */

console.log('🔍 TESTE DE PERSISTÊNCIA DO CARRINHO')
console.log('======================================')

if (typeof window !== 'undefined') {
  // Verificar se há dados salvos
  const cartData = localStorage.getItem('esoterica_cart_v1')
  
  if (cartData) {
    console.log('✅ Dados do carrinho encontrados no localStorage:')
    console.log(JSON.parse(cartData))
  } else {
    console.log('ℹ️ Nenhum dado do carrinho encontrado no localStorage')
  }
  
  // Função para testar a persistência
  window.testCartPersistence = () => {
    console.log('🧪 Executando teste de persistência...')
    
    // Simular adição de item
    const testItem = { productId: 999, qty: 1 }
    const existingData = localStorage.getItem('esoterica_cart_v1')
    let cartData = { lines: [] }
    
    if (existingData) {
      cartData = JSON.parse(existingData)
    }
    
    cartData.lines.push(testItem)
    localStorage.setItem('esoterica_cart_v1', JSON.stringify(cartData))
    
    console.log('✅ Item de teste adicionado ao localStorage')
    console.log('🔄 Recarregue a página para testar a persistência')
  }
  
  console.log('💡 Execute window.testCartPersistence() no console para testar')
}