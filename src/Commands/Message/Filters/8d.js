import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default {
  name: "8d",
  aliases: ["3d"],
  category: "Filters",
  permission: "",
  desc: "Toggles 8D filter!",
  options: {
    owner: false,
    inVc: true,
    sameVc: true,
    player: {
      playing: true,
      active: true,
    },
    premium: false,
    vote: false,
  },
  /**
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message, player: import("kazagumo").Player, args: string[] }} ctx
   * @param {import("discord.js").Message} message
   */
  run: async ({ client, message, emojis, player, args }) => {
    try {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("on")
          .setLabel("On")
          .setStyle(client.Buttons.grey),
        new ButtonBuilder()
          .setCustomId("off")
          .setLabel("Off")
          .setStyle(client.Buttons.grey)
      );
      const embed = new EmbedBuilder()
        .setDescription(`<a:dch_catheart:1071384664083808346> **8D Filter**`)
        .setColor(client.settings.COLOR);
      message.channel
        .send({ embeds: [embed], components: [row] })
        .then(async (msg) => {
          const filter = (i) => i.user.id === message.author.id;
          const collector = msg.createMessageComponentCollector({
            filter,
            time: 15000,
          });
          collector.on("collect", async (i) => {
            if (i.customId === "on") {
              const data = {
                op: "filters",
                guildId: message.guild.id,
                rotation: { rotationHz: 0.103 },
              };
              player.send(data);

              const embed = new EmbedBuilder()
                .setDescription(
                  `<:serverinforight:1026436118192848906> | **8D Filter Turned On**`
                )
                .setColor(client.settings.COLOR);
              message.channel.send({ embeds: [embed] });
              msg.delete();
            } else if (i.customId === "off") {
              const data = {
                op: "filters",
                guildId: message.guild.id,
                rotation: { rotationHz: 0 },
              };
              player.send(data);
              const embed = new EmbedBuilder()
                .setDescription(
                  `<:serverinforight:1026436118192848906> | **8D Filter Turned Off**`
                )
                .setColor(client.settings.COLOR);
              message.channel.send({ embeds: [embed] });
              msg.delete();
            }
          });
          collector.on("end", (collected) => {
            msg.delete();
          });
        });
    } catch (e) {
      console.log(e);
    }
  },
};










/*

This Code Belongs To Tejas Shettigar (TEZZ 444). Modification of code is not suggested. A Credit Is Mandatory. Join SUpport Server For More Info 

Support Server - >  https://discord.gg/wcqmHgNzDn

*/