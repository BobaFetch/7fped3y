<script context="module">
  import {guard} from '$lib/protection'
  export async function load(url) {
    return (guard(url))
  }

  // export const ssr = false
</script>

<script>
  import '../app.css'
  import {authenticated} from '$lib/stores/tempStore'
  import Header from '$lib/components/Header.svelte';
</script>

{#if $authenticated}
<div class="container-full h-screen bg-slate-900 flex flex-col overflow-hidden">
  <div class="">
    <Header />
  </div>
  <div class="overflow-auto font-body">
    <slot />
  </div>
</div>
{:else}
<div class="container-full h-screen bg-slate-900">
  <slot />
</div>
{/if}