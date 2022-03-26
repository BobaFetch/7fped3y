<script>
  import Card from '$lib/components/Card.svelte'
  export let name
</script>

<div class='grid grid-cols-12'>
  <div class="col-span-7">
    <Card>
      <svelte:fragment slot="body">
        <div>
          <h4 class="font-bold">Profile</h4>
          <h6 class="text-xs text-gray-400">Name</h6>
          <h5 class='text-xs'>{name}</h5>
        </div>
        <div>
          <a href="/settings/edit/[user]" class="text-xs text-brandTeal">EDIT</a>
        </div>
      </svelte:fragment>
    </Card>
  </div>
</div>