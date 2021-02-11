import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Helper from "@/components/Helper";
import Manual from "@/components/Manual";
import CID10 from "@/components/CID10";
import Info from "@/components/Info";
import LGPD from "@/components/LGPD";
import BackMeUp from "@/components/BackMeUp";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/legenda",
      name: "helper",
      component: Helper
    },
    {
      path: "/manual",
      name: "manual",
      component: Manual
    },
    {
      path: "/info",
      name: "info",
      component: Info
    },
    {
      path: "/cid10",
      name: "cid10",
      component: CID10
    },
    {
      path: "/lgpd",
      name: "LGPD",
      component: LGPD
    },
    {
      path: "/apoio",
      name: "Contribua",
      component: BackMeUp
    },
  ]
});
