<script>
  export let title
</script>

<div class="flex flex-row w-full m-3 static">
  <h4 class="text-brandWhite text-2xl ">{title}</h4>
  <input type="text" placeholder={`Search ${title}`} class="mx-auto rounded-xl w-1/2 sm:w-72 text-center" />
  <input type="button" value="+ Add a Deal" class="bg-brandTeal rounded p-2 cursor-pointer" />
</div>