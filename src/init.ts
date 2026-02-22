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
    const prefix = tags ? `${tags},` : "";
    material.set(
      "tags",
      `${prefix}[indestructible],[matter_eater_ignore_list]`,
    );
  }
}

print_error(log.join("\n"));
