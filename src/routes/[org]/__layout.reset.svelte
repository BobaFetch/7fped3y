<script>
  import {authenticated} from '$lib/stores/tempStore'
  import SideMenu from "$lib/components/SideMenu.svelte";
  import { goto } from '$app/navigation';
</script>

{#if $authenticated}
<div class=" h-screen bg-brandBlue grid grid-cols-8">
  <div class="col-span-1 border-r-[.5px] border-brandTeal">
    <SideMenu />
  </div>
  <div class="col-span-7">
    <slot />
  </div>
</div>
{:else}
{location.replace('/login')}
{/if}