<template>
  <div class="home">
    <div>
      <br/>
      <br/>
      <h1 class="display-3">INFO</h1>
      <p class="lead">
        This app was made in about 3 hours time, the majority of which being spent reading documentation/info on the Vue framework. 
        Vue was chosen for fun such that I could have an excuse to explore it in implementation for the first time. 
        If I could do this assignment over again, I would likely build an express app using the built in scaffolding tools and ReactJS, 
        and would not essentially embed a component's JS and CSS in component files themselves.  
        The patterns that Vue is built around make less sense in my opinion when it comes to state management and reactive programming among other things. 
        Secure auth and cloud hosting, as well as robust input massaging and UTs, were not explored for the sake of time.
      </p>
      <p class="lead">- Rob Williford</p>
    </div>
  </div>
</template>

<style>
  .home {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .home .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }

  .home img {
   margin-top: 15%;
   width: 25%;
   height: auto;
  }
</style>
