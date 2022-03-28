<script context="module">
  import {guard} from '$lib/protection'

  export async function load(url) {
    return (guard(url))
  }

  export const ssr = false
</script>

<script>
  import '../app.css'
  import SideMenu from '$lib/components/SideMenu.svelte'
  import {authenticated} from '$lib/stores/tempStore'
</script>

{#if $authenticated}
<div class=" h-screen bg-brandBlue grid grid-cols-12 overflow-hidden">
  <div class="col-span-1 border-r-[.5px] border-brandTeal">
    <SideMenu />
  </div>
  <div class="col-span-11 mt-5 m-3 overflow-auto">
    <slot />
  </div>
</div>
{:else}
<div class="h-screen bg-brandBlue p-3">
  <slot />
</div>
{/if}