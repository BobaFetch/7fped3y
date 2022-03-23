<script>
  import {fly} from 'svelte/transition'
</script>

<div
  class="border border-black"
  in:fly={{x: 200, duration: 200}}>
  <p>hello</p>
</div>