<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Imagens do Produto</h3>
        <p class="text-sm text-gray-600 dark:text-slate-300 mt-1">Adicione até 10 imagens de alta qualidade</p>
      </div>
      <Button 
        type="button"
        class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        @click="triggerFileInput"
        :disabled="loading || images.length >= 10"
      >
        <ImagePlus class="w-4 h-4 mr-2" />
        {{ loading ? 'Processando...' : 'Adicionar Imagens' }}
      </Button>
    </div>

    <!-- Input de arquivo oculto -->
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*"
      class="hidden"
      @change="handleFileSelect"
    />

    <!-- Images Preview -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="(image, index) in images"
        :key="image.id"
        class="relative group bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-lg border border-gray-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <!-- Image Preview -->
        <div class="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            :src="image.url"
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <!-- Control Overlay -->
        <div class="absolute inset-3 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center">
          <div class="flex gap-2">
            <Button
              size="sm"
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 w-8 h-8 p-0 rounded-lg transition-all duration-200"
              @click="setPrimaryImage(image.id)"
              :disabled="image.isPrimary"
              :title="image.isPrimary ? 'Imagem principal' : 'Definir como principal'"
            >
              <Star :class="['w-3 h-3', image.isPrimary ? 'fill-yellow-400 text-yellow-400' : 'text-white']" />
            </Button>
            <Button
              size="sm"
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 w-8 h-8 p-0 rounded-lg transition-all duration-200"
              @click="moveImage(index, -1)"
              :disabled="index === 0"
              title="Mover para esquerda"
            >
              <ArrowLeft class="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 w-8 h-8 p-0 rounded-lg transition-all duration-200"
              @click="moveImage(index, 1)"
              :disabled="index === images.length - 1"
              title="Mover para direita"
            >
              <ArrowRight class="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              class="bg-red-500/80 backdrop-blur-sm hover:bg-red-600/90 text-white border-red-400/30 w-8 h-8 p-0 rounded-lg transition-all duration-200"
              @click="removeImage(image.id)"
              title="Remover imagem"
            >
              <Trash2 class="w-3 h-3" />
            </Button>
          </div>
        </div>

        <!-- Primary Badge -->
        <div v-if="image.isPrimary" class="absolute top-5 left-5">
          <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
            <Star class="w-3 h-3 fill-current" />
            Principal
          </div>
        </div>

        <!-- Order Badge -->
        <div class="absolute top-5 right-5">
          <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-700 dark:text-slate-300 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow-md">
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <!-- Drop Zone -->
      <div
        v-if="images.length === 0"
        class="col-span-full bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300/50 rounded-2xl p-12 text-center hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group cursor-pointer"
        :class="{ 'border-blue-500 bg-blue-100': isDragOver }"
        @drop="handleDrop"
        @dragover.prevent="isDragOver = true"
        @dragenter.prevent="isDragOver = true"
        @dragleave="isDragOver = false"
        @click="triggerFileInput"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
            <ImageIcon class="w-12 h-12 text-blue-600" />
          </div>
          <div class="space-y-2">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white">Adicione suas imagens</h4>
            <p class="text-gray-600 dark:text-slate-300 max-w-sm">
              Arraste e solte as imagens aqui ou clique para selecionar do seu computador
            </p>
          </div>
          <Button 
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            @click.stop="triggerFileInput"
          >
            <ImagePlus class="w-4 h-4 mr-2" />
            Selecionar Imagens
          </Button>
        </div>
      </div>

      <!-- Add More Button -->
      <div
        v-if="images.length > 0 && images.length < 10"
        class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl p-8 text-center hover:from-gray-100 hover:to-gray-200 dark:hover:from-slate-700 dark:hover:to-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 group cursor-pointer"
        @drop="handleDrop"
        @dragover.prevent="isDragOver = true"
        @dragenter.prevent="isDragOver = true"
        @dragleave="isDragOver = false"
        @click="triggerFileInput"
        :class="{ 'border-blue-500 bg-blue-50': isDragOver }"
      >
        <div class="flex flex-col items-center gap-3">
          <div class="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
            <Plus class="w-8 h-8 text-gray-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
          </div>
          <div class="space-y-1">
            <p class="font-semibold text-gray-900 dark:text-white">Adicionar mais</p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ 10 - images.length }} restantes</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Tips -->
    <div v-if="images.length > 0" class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl p-6 border border-blue-200/50 dark:border-slate-600/50">
      <div class="space-y-3">
        <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          Dicas de Upload
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-slate-300">
          <div class="flex items-center gap-2">
            <Star class="w-4 h-4 text-yellow-500" />
            <span>A primeira imagem será definida como principal</span>
          </div>
          <div class="flex items-center gap-2">
            <ArrowLeft class="w-4 h-4 text-blue-500" />
            <span>Use as setas para reordenar as imagens</span>
          </div>
          <div class="flex items-center gap-2">
            <ImageIcon class="w-4 h-4 text-green-500" />
            <span>Formatos: JPG, PNG, WebP (máx. 5MB)</span>
          </div>
          <div class="flex items-center gap-2">
            <Trash2 class="w-4 h-4 text-red-500" />
            <span>Clique no lixo para remover imagens</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-200/50 dark:border-blue-800/50">
      <div class="flex items-center justify-center gap-3">
        <div class="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div class="text-blue-700 font-semibold">Processando imagens...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { 
  ImagePlus, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Trash2, 
  ImageIcon,
  Plus
} from 'lucide-vue-next'
import type { ProductImage } from '@/types/product'

interface Props {
  modelValue: ProductImage[]
}

interface Emits {
  (e: 'update:modelValue', value: ProductImage[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const loading = ref(false)
const isDragOver = ref(false)

// Usar computed com getter/setter para evitar loops
const images = computed({
  get: () => props.modelValue,
  set: (value: ProductImage[]) => emit('update:modelValue', value)
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    processFiles(Array.from(files))
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  const files = event.dataTransfer?.files
  if (files) {
    processFiles(Array.from(files))
  }
}

const processFiles = async (files: File[]) => {
  loading.value = true
  
  try {
    for (const file of files) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        console.warn(`Arquivo ${file.name} não é uma imagem válida`)
        continue
      }
      
      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.warn(`Arquivo ${file.name} é muito grande (máx. 5MB)`)
        continue
      }
      
      // Criar URL de preview
      const url = URL.createObjectURL(file)
      
      // Criar objeto de imagem
      const newImage: ProductImage = {
        id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url,
        alt: file.name.replace(/\.[^/.]+$/, ''), // Remove extensão
        isPrimary: images.value.length === 0, // Primeira imagem é principal
        order: images.value.length
      }
      
      images.value = [...images.value, newImage]
    }
  } catch (error) {
    console.error('Erro ao processar imagens:', error)
  } finally {
    loading.value = false
  }
}

const setPrimaryImage = (imageId: string) => {
  images.value = images.value.map(img => ({
    ...img,
    isPrimary: img.id === imageId
  }))
}

const moveImage = (currentIndex: number, direction: number) => {
  const newIndex = currentIndex + direction
  if (newIndex < 0 || newIndex >= images.value.length) return
  
  const newImages = [...images.value]
  const [movedImage] = newImages.splice(currentIndex, 1)
  newImages.splice(newIndex, 0, movedImage)
  
  // Atualizar ordem
  newImages.forEach((img, index) => {
    img.order = index
  })
  
  images.value = newImages
}

const removeImage = (imageId: string) => {
  const imageToRemove = images.value.find(img => img.id === imageId)
  if (imageToRemove) {
    // Revogar URL se for um blob
    if (imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url)
    }
  }
  
  let filteredImages = images.value.filter(img => img.id !== imageId)
  
  // Se removemos a imagem principal e ainda há imagens, definir a primeira como principal
  if (imageToRemove?.isPrimary && filteredImages.length > 0) {
    filteredImages = filteredImages.map((img, index) => ({
      ...img,
      isPrimary: index === 0,
      order: index
    }))
  } else {
    // Apenas reordenar
    filteredImages = filteredImages.map((img, index) => ({
      ...img,
      order: index
    }))
  }
  
  images.value = filteredImages
}

// Cleanup ao desmontar
onUnmounted(() => {
  images.value.forEach(img => {
    if (img.url.startsWith('blob:')) {
      URL.revokeObjectURL(img.url)
    }
  })
})
</script>