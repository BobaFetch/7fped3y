<script>
  import {fly} from 'svelte/transition'
  import { goto } from '$app/navigation'; 

  import {authenticated} from '$lib/stores/tempStore'
  export let newSignUp
  let email
  let password

  const handleSignUp = () => {
    newSignUp = true
  }

  const handleLogin = () => {
    $authenticated = true
    goto('/demo/deals')
  }
</script>

<div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5'>
  <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>Login</h1>
  <input type="email" bind:value={email} placeholder="ex: name@work-email.com" class="w-1/2 mt-5 mb-2 p-3 rounded-lg bg-[#ddf0f2]" />
  <input type="password" bind:value={email} placeholder="" class="w-1/2 mb-5 p-3 rounded-lg bg-[#ddf0f2]" />
  <button class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" on:click|preventDefault={handleLogin}>Submit</button>
</div>
<p class="text-brandWhite text-center">Need an account? <span on:click={handleSignUp} class=" text-[#6ecad4] cursor-pointer">Sign Up</span></p>
