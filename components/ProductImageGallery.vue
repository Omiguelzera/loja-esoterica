<template>
  <div 
    class="space-y-6"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Main Image -->
    <div class="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg group">
      <img
        v-if="selectedImage"
        :src="selectedImage.url"
        :alt="selectedImage.alt"
        class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        :class="{ 'cursor-zoom-in': !isZoomed }"
        @click="toggleZoom"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="text-center space-y-3">
          <ImageIcon class="w-20 h-20 text-gray-400 mx-auto" />
          <p class="text-gray-500 font-medium">Nenhuma imagem disponível</p>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div v-if="images.length > 1" class="absolute inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="icon"
          class="ml-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 shadow-lg hover:shadow-xl text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full w-12 h-12 transition-all duration-300 disabled:opacity-50"
          @click="previousImage"
          :disabled="!canGoPrevious"
        >
          <ChevronLeft class="w-6 h-6" />
        </Button>
      </div>
      
      <div v-if="images.length > 1" class="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="icon"
          class="mr-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 shadow-lg hover:shadow-xl text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full w-12 h-12 transition-all duration-300 disabled:opacity-50"
          @click="nextImage"
          :disabled="!canGoNext"
        >
          <ChevronRight class="w-6 h-6" />
        </Button>
      </div>

      <!-- Image Counter -->
      <div v-if="images.length > 1" class="absolute bottom-6 right-6">
        <div class="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-semibold">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <!-- Zoom Button -->
      <div v-if="selectedImage" class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="sm"
          class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 shadow-lg text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full px-3 py-2 transition-all duration-300"
          @click="toggleZoom"
        >
          <ZoomIn v-if="!isZoomed" class="w-4 h-4 mr-1" />
          <ZoomOut v-else class="w-4 h-4 mr-1" />
          {{ isZoomed ? 'Fechar' : 'Ampliar' }}
        </Button>
      </div>

      <!-- Auto-play Indicator -->
      <div v-if="autoPlay && images.length > 1" class="absolute top-6 left-6">
        <div class="bg-blue-500/80 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
          <div class="w-2 h-2 bg-white dark:bg-slate-300 rounded-full animate-pulse"></div>
          Auto-play
        </div>
      </div>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
      <button
        v-for="(image, index) in sortedImages"
        :key="image.id"
        @click="selectImage(index)"
        :class="[
          'flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all duration-300 transform',
          currentIndex === index
            ? 'border-blue-500 ring-4 ring-blue-500/20 scale-105 shadow-lg'
            : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:scale-102 shadow-md hover:shadow-lg'
        ]"
        :title="`Ver imagem ${index + 1}`"
      >
        <img
          :src="image.url"
          :alt="image.alt"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <!-- Primary Badge -->
        <div v-if="image.isPrimary" class="absolute -top-1 -right-1">
          <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
            <Star class="w-3 h-3 fill-current" />
          </div>
        </div>
      </button>
    </div>

    <!-- Zoom Modal -->
    <Teleport to="body">
      <div
        v-if="isZoomed && selectedImage"
        class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
        @click="toggleZoom"
      >
        <div class="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
          <img
            :src="selectedImage.url"
            :alt="selectedImage.alt"
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            @click.stop
          />
          
          <!-- Close Button -->
          <Button
            size="icon"
            class="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-full w-12 h-12 shadow-lg transition-all duration-300"
            @click="toggleZoom"
            title="Fechar (ESC)"
          >
            <X class="w-6 h-6" />
          </Button>

          <!-- Navigation in Zoom -->
          <div v-if="images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
            <Button
              size="icon"
              class="ml-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full w-14 h-14 shadow-lg transition-all duration-300 disabled:opacity-50"
              @click.stop="previousImage"
              :disabled="currentIndex === 0"
              title="Imagem anterior (←)"
            >
              <ChevronLeft class="w-7 h-7" />
            </Button>
          </div>
          
          <div v-if="images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
            <Button
              size="icon"
              class="mr-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full w-14 h-14 shadow-lg transition-all duration-300 disabled:opacity-50"
              @click.stop="nextImage"
              :disabled="currentIndex === images.length - 1"
              title="Próxima imagem (→)"
            >
              <ChevronRight class="w-7 h-7" />
            </Button>
          </div>

          <!-- Counter and Image Info -->
          <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div class="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center gap-4">
              <span class="font-semibold">{{ currentIndex + 1 }} / {{ images.length }}</span>
              <div class="w-px h-4 bg-white/30 dark:bg-slate-400/30"></div>
              <span class="text-sm">{{ selectedImage.alt }}</span>
            </div>
          </div>

          <!-- Thumbnail Strip in Zoom -->
          <div v-if="images.length > 1" class="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div class="flex gap-2 bg-black/50 backdrop-blur-sm p-3 rounded-xl">
              <button
                v-for="(image, index) in sortedImages"
                :key="`zoom-${image.id}`"
                @click.stop="selectImage(index)"
                :class="[
                  'w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300',
                  currentIndex === index
                    ? 'border-white scale-110'
                    : 'border-white/50 hover:border-white opacity-70 hover:opacity-100'
                ]"
              >
                <img
                  :src="image.url"
                  :alt="image.alt"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { 
  ChevronLeft, 
  ChevronRight, 
  ImageIcon, 
  ZoomIn, 
  ZoomOut, 
  X,
  Star
} from 'lucide-vue-next'
import type { ProductImage } from '@/types/product'

interface Props {
  images: ProductImage[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: false,
  autoPlayInterval: 5000
})

const currentIndex = ref(0)
const isZoomed = ref(false)

// Ordenar imagens: principal primeiro, depois por ordem
const sortedImages = computed(() => {
  return [...props.images].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1
    if (!a.isPrimary && b.isPrimary) return 1
    return a.order - b.order
  })
})

const selectedImage = computed(() => {
  return sortedImages.value[currentIndex.value]
})

const canGoPrevious = computed(() => {
  return currentIndex.value > 0
})

const canGoNext = computed(() => {
  return currentIndex.value < sortedImages.value.length - 1
})

// Reset index quando imagens mudarem
watch(() => props.images, () => {
  if (currentIndex.value >= props.images.length) {
    currentIndex.value = 0
  }
}, { immediate: true })

const selectImage = (index: number) => {
  currentIndex.value = index
}

const previousImage = () => {
  if (canGoPrevious.value) {
    currentIndex.value--
  }
}

const nextImage = () => {
  if (canGoNext.value) {
    currentIndex.value++
  } else if (props.autoPlay) {
    // Voltar ao início no autoplay
    currentIndex.value = 0
  }
}

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
}

// AutoPlay
let autoPlayTimer: NodeJS.Timeout | null = null

const startAutoPlay = () => {
  if (!props.autoPlay || sortedImages.value.length <= 1) return
  
  autoPlayTimer = setInterval(() => {
    nextImage()
  }, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (isZoomed.value) {
    switch (event.key) {
      case 'Escape':
        toggleZoom()
        break
      case 'ArrowLeft':
        event.preventDefault()
        previousImage()
        break
      case 'ArrowRight':
        event.preventDefault()
        nextImage()
        break
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  if (props.autoPlay) {
    startAutoPlay()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  stopAutoPlay()
})

// Pausar autoplay ao fazer hover
const handleMouseEnter = () => {
  if (props.autoPlay) stopAutoPlay()
}

const handleMouseLeave = () => {
  if (props.autoPlay) startAutoPlay()
}
</script>