<script>
  import logo from '$lib/assets/logo.svg'
  import Login from '$lib/components/Login.svelte'
  import Register from '$lib/components/Register.svelte'
  export let newSignUp = true

</script>

<div>
  <img src={logo} alt="monette logo" width="400" class="mx-auto">
  {#if newSignUp}
  <Register bind:newSignUp/>
  {:else}
  <Login bind:newSignUp />
  {/if}
</div>

