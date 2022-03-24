<script>
  import { authenticated } from '$lib/stores/tempStore';
  import {goto} from '$app/navigation'
  import logo from '$lib/assets/logo.svg'

  import {fly} from 'svelte/transition'
  let email
  let password
  let confirmPassword

  const handleSignUp = () => {
    $authenticated  = true
    goto('/demo/deals')
  }

 
</script>
<div>
  <img src={logo} alt="monette logo" width="400" class="mx-auto">
  <div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5'>
    <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>Join your team</h1>
    <h4 class="text-[#cccccc] my-5">Create your account with your work email, your team's waiting for you</h4>
    <input type="email" bind:value={email} placeholder="ex: name@work-email.com" class="w-1/2 mt-5 mb-2 p-3 rounded-lg bg-[#ddf0f2]" />
    <input type="password" bind:value={password} placeholder="Password" class="w-1/2 mb-2 p-3 rounded-lg bg-[#ddf0f2]" />
    <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" class="w-1/2 mb-5 p-3 rounded-lg bg-[#ddf0f2]" />
    <button class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" on:click|preventDefault={handleSignUp}>Join</button>
  </div>  
</div>

