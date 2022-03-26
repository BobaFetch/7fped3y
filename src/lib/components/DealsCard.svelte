<script>
  import Fa from 'svelte-fa'
  import { faUser } from '@fortawesome/free-regular-svg-icons'
  export let props
  console.log()
</script>


{#if props === null}
  <div class="w-62 h-20 rounded my-5 border border-brandWhite border-dotted"></div>
{:else}
<div class='flex flex-row bg-blue-900 p-2 w-62 h-20 rounded my-5'>
  <div class='bg-brandWhite rounded-full w-10 h-10 p-1.5'>
    <Fa icon={faUser} size='2x' />
  </div>
  <span class="text-white ml-2">{props.firstName} {props.lastName}</span>
</div>
{/if}