<script>
  import logo from '$lib/assets/logo.svg'
  import Login from '$lib/components/Login.svelte'
  import Register from '$lib/components/Register.svelte'
  let newSignUp = $page.url.pathname === '/login' ? false : true

  import {page} from '$app/stores'
  console.log($page)
</script>

<div>
  <img src={logo} alt="monette logo" width="400" class="mx-auto">
  {#if newSignUp}
  <Register bind:newSignUp/>
  {:else}
  <Login />
  {/if}
</div>

