<script>
  import '../app.css'
  import Auth from '$lib/components/Auth.svelte'
  let authenticated = false
</script>


<div class="h-screen bg-brandBlue">

  {#if authenticated}
  <slot />
  {:else}
  <Auth />
  {/if}
</div>