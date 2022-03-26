<script>
  import SideMenu from "$lib/components/SideMenu.svelte";  
</script>

<div class=" h-screen bg-brandBlue grid grid-cols-8">
  <div class="col-span-1 border-r-[.5px] border-brandTeal">
    <SideMenu />
  </div>
  <div class="col-span-7 mx-3">
    <slot />
  </div>
</div>