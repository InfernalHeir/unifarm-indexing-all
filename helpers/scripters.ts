import fs from "fs";
import yaml from "yaml";
import { chainNameById } from "../constants";
import { Promise } from "bluebird";
import { actionsProperties } from "../actions";

export function yamlParser(chainId: number) {
  const fileContent = fs.readFileSync("./command.yml", "utf8");
  const manifest = yaml.parse(fileContent);
  return manifest.services[chainNameById[chainId]].cohorts;
}

export async function multicall(
  actions: string[],
  params: any[]
) {
    var n = 0;
    var multi: any[] = [];
    // dyanmic import
    var modules: any = await import("../helpers");
    // loop thorough all actions
    while (n < actions.length) {
      multi.push(modules[actions[n]](...params[n]));
      n++;
    }

    var results = await Promise.map(multi, (values, index) => {
      var obj: any = {};
      var properties = actionsProperties(actions[index]);
      if (!properties) return null;
      obj[properties] = values;
      return obj;
    });

    return results;

}
