<script>
  import '../app.css'
  import {authenticated} from '$lib/stores/tempStore'
  import Auth from '$lib/components/Auth.svelte'
  
</script>


<div class="h-screen bg-brandBlue">

  {#if $authenticated}
  <slot />
  {:else}
  <Auth />
  {/if}
</div>