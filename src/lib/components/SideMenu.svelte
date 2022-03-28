<script>
  import Fa from 'svelte-fa'
  import { faMap, faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons'
</script>

<div class="flex flex-col items-center h-screen sticky">
  <div class="flex flex-col flex-1 my-5 w-full items-center ">
    <div class="w-10 h-10 bg-white rounded-full text-center ">logo</div>
    <a href='/deals' class="my-5 text-brandWhite ">
      <Fa icon={faMap} size='2x'/>
    </a>
    <a href="/contacts" class="text-brandWhite font-thin"><Fa icon={faUser} size='2x' /></a>
  </div>
  <div class='my-5'>
      <a href="/settings/1"><div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <Fa icon={faUserCircle} size='2x' />
      </a>
  </div>
</div>