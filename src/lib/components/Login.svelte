<script>
  import {fly} from 'svelte/transition'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Loader } from '@steeze-ui/feather-icons'

  export let newSignUp
  let email
  let password

  let loadingModal = true

  const handleDelay = () => {
    loadingModal = false
    setTimeout(() => {
      fetch('/api/auth', {method: 'GET'}).then(() => location.replace('/collabs'))
    }, 2000)
  }

  const handleSignUp = () => {
    newSignUp = true
  }

</script>

<div class:blur-sm={!loadingModal}>
  <div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5 p-3'>
    <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5 font-header'>Login</h1>
    <input type="email" bind:value={email} placeholder="ex: name@work-email.com" class="sm:w-1/2 w-full mt-5 mb-2 p-3 rounded-lg bg-[#ddf0f2]" />
    <input type="password" bind:value={password} placeholder="**********" class="sm:w-1/2 w-full mb-5 p-3 rounded-lg bg-[#ddf0f2]" />
    <button class="bg-[#52c0cc] sm:w-1/2 w-full p-3 rounded-lg" on:click|preventDefault={handleDelay}>Submit</button>
  </div>
  <p class="text-brandWhite text-center">Need an account? <span on:click|preventDefault={handleSignUp} class=" text-[#6ecad4] cursor-pointer">Sign Up</span></p>
</div>

<div class:hidden={loadingModal} class="absolute top-0 left-0 w-full h-full">
  <div class="flex items-center justify-center h-full">
      <Icon src={Loader} width="100" height="100" class="text-teal-500 animate-spin-slow" />
  </div>
</div>