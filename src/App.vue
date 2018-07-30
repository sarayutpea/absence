<template>
  <div class="app">
        <v-app id="inspire">
        <!-- menu position -->
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
            <v-list dense>
                <template v-for="item in items">
                    <v-list-group v-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i"  :to="child.link" >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" :to="item.link">
                        <v-list-tile-action>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                              {{ item.text }}
                          </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <!-- end menu position -->

        <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Absence</span>
            </v-toolbar-title>
                <breadcrumbs :title="title" />
            <v-spacer>

            </v-spacer>
                    
            <v-btn icon large>
                <v-avatar size="32px" tile>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Wikimedia_Community_Logo-Cabal-blank.png" alt="Absence">
                </v-avatar>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-width>
                <!-- content -->
                <transition name="router-animation">
                    <router-view></router-view>
                </transition>
                
            </v-container>
        </v-content>
    </v-app>


    </div>
</template>

<script>

import Breadcrumbs from './components/layouts/Breadcrumbs.vue';
export default {
  name: 'App',
  components: {
    Breadcrumbs,
  },
  data: ()=>({
    title: "",
    dialog: false,
    drawer: null,
    items: [
      { icon: "computer", text: "Dashboard", link: "/dashboard" },
      { icon: "account_circle", text: "Employees", link: "/employees" },
    //   { icon: "content_copy", text: "Duplicates" },
    //   {
    //     icon: "keyboard_arrow_up",
    //     "icon-alt": "keyboard_arrow_down",
    //     text: "Labels",
    //     model: true,
    //     children: [{ icon: "add", text: "Create label" }]
    //   },
      {
        icon: "keyboard_arrow_up", 
        'icon-alt' : "keyboard_arrow_down",
        text: "More",
        model: false,
        children: [
          { text: "Logout", link:"#" },
        ]
      }
    //   { icon: "settings", text: "Settings" },
    //   { icon: "chat_bubble", text: "Send feedback" },
    //   { icon: "help", text: "Help" },
    //   { icon: "phonelink", text: "App downloads" },
    //   { icon: "keyboard", text: "Go to the old version" }
    ],
    breadcrumbs: Breadcrumbs.items
  }),
  props:{
    source: String,
  },
  methods:{
    
  },
  mounted(){
      
      localStorage.setItem('auth','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc3MGQyNjhmMTFlNjBlNzAxYTY5Mzg2MjFlMDJiYzllYTllNmY1ODg5MGMzOWFhNDgwODZiNzVkNmExZTkxNzlhMjY0OTFjMTg1OTUxMGU4In0.eyJhdWQiOiIyIiwianRpIjoiNzcwZDI2OGYxMWU2MGU3MDFhNjkzODYyMWUwMmJjOWVhOWU2ZjU4ODkwYzM5YWE0ODA4NmI3NWQ2YTFlOTE3OWEyNjQ5MWMxODU5NTEwZTgiLCJpYXQiOjE1MzE5ODMxOTIsIm5iZiI6MTUzMTk4MzE5MiwiZXhwIjoxNTYzNTE5MTkyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.KX09-bfrKMTlcoybDpQXJa-u37-QLUBYuarPZxjapLf_sbx7PmL418seRlcyNmrgKLbqzjpsQV80EDfZzQBupwpW3fbMVGEexmU7PSha6kWOYFPCNlPEBhH3wWCGYDsbVRXFtOPb5inKTj05LtyQ0CmJtQZQs9dXyQcelsGlaJuuuBjtN69Mf_NESN2Ell4Z7FLHfxcnqMqM3oEqRtCDFxdGOUSWO3TCs3alH9-YRQezjQIP9C4Sp6AUp_t85OqImD0TF7F-koyNqqD8NjovtAgQOr6eL_KCNpMAeFNU2lAgqUdRIWwCYdMaREsvCtjHPlL5MzCUvO_7eL07IU725xB_ivnhINhFCi2vGOhkT_u_GPa5OmK4v9b1mgH0oa-9A96ngmqRx5utlo3p65OEb15ll35jd1quSATjD01Zzg0BUfDehCGxzKilRXtRmy1wYbQ0JilRRwnyKAevi1NX6aKgOOYUIm0eKILEacIZNOqUu0zwU-GSB33ZNVxI-0-EfzesqHHSsywIw5KN3hEk54vLveKOO7vd8p6sGDrqvsrxKzgeNDpWQcLyEnki1y9cPmKn2swC7Fs-zDt6jCFvq8vXobP7RaOUlY-9aqrj2i3l9ZkVJ6BiS8_ZrUyPhxzS-5cXvSqIcB4i-Z4dzCh9WbOXhk_d5Z9Q7T0cWFsGs4o')
  },
  created(){
      this.$root.$on('title', (event)=>{
          this.title = event;
      });
  }
}
</script>

<style scope>
a{
  text-decoration: none;
}
.router-animation-enter-active{
    animation: fade-in;
    animation-duration: 0.5s;
}
.router-animation-leave-active{
    animation: fade-out;
    animation-duration: 0.2s;
}
@keyframes fade-in{
    0% {
        opacity: 0;
        transform: translateX(-50px);
    }
    50% {
        opacity: 0;
        transform: translateX(-50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
@keyframes fade-out{
    0% {
        opacity: 1;
        transform: translateX(0px);
    }
    50% {
        opacity: 0;
    }
    100% {
        transform: translateX(-50px);
        opacity: 0;
    }
}
</style>
