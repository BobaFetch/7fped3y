<script>
  export let contact
</script>

<div class='w-full m-3 bg-brandTeal rounded grid grid-cols-12 p-5 content-center'>
  <div class='w-10 h-10 bg-brandWhite rounded-full mr-3 col-span-1'></div>
  <p class='col-span-5'>{contact.name}</p>
  <p class='col-span-5 '>{contact.deals > 0 ? contact.deals + ' Deal' : ''}</p>
  <p>{contact.viewers ? contact.viewers : ''}</p>
</div>