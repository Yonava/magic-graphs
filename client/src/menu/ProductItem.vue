<script setup lang="ts">
  import type { ProductInfo } from 'src/types';

  defineProps<{
    product: Required<ProductInfo>;
  }>();
</script>

<template>
  <div class="group relative flex items-center justify-center max-w-44">
    <div>
      <div
        class="relative w-60 h-60 group-hover:scale-105 transition-all duration-500 ease-out flex items-center justify-center"
      >
        <img
          :src="product.menu.thumbnail"
          :alt="product.menu.name"
          class="w-full h-full object-cover rounded-2xl"
        />
        <div
          class="absolute top-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-500 bg-gray-900 bg-opacity-90 rounded-2xl p-4"
        >
          <p class="text-white font-bold">
            {{ product.menu.description }}
          </p>
        </div>
      </div>
      <h2
        class="text-center font-bold text-2xl mt-4 transition duration-500 h-8"
      >
        {{ product.menu.name }}
      </h2>
    </div>

    <!-- shadow -->
    <div class="absolute -z-10 w-[150%] h-[150%] pointer-events-none">
      <div
        class="absolute inset-0 group-hover:bg-purple-500 blur-2xl opacity-30 rounded-full transition duration-500"
      ></div>
      <div
        class="relative text-yellow-500 text-6xl font-bold group-hover:w-full group-hover:h-full transition duration-500"
      ></div>
    </div>
  </div>
</template>
