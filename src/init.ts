import { MOD_ID } from "$mod";
import nxml from "@noita-ts/nxml";

const log = [];

for (const xml of nxml.edit_file("data/materials.xml")) {
  for (const material of xml.children) {
    const durability = material.get("durability");

    if ((tonumber(durability) ?? 0) < 12) {
      continue;
    }

    log.push(
      `[${MOD_ID}] Material ${material.get("name")} is now indestructible`,
    );

    material.set("durability", 9001);

    const tags = material.get("tags");
    // tags is set on all/most CellDatas, avoid overriding it in CellDataChilds
    if (!tags) {
      continue;
    }

    const taglist = tags.split(",").filter((tag) => tag !== "[corrodible]"); // no acid

    // no black holes and matter eater
    taglist.push("[indestructible]");
    taglist.push("[matter_eater_ignore_list]");

    material.set("tags", taglist.join(","));
  }
}

for (const xml of nxml.edit_file(
  "data/entities/projectiles/deck/worm_shot.xml",
)) {
  for (const comp of xml.each_of("CellEaterComponent")) {
    comp.set("ignored_material_tag", "[indestructible]");
  }
}

print_error(log.join("\n"));
