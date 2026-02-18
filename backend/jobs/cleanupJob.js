import cron from "node-cron";
import { Leave } from "../models/index.js";
import { Op } from "sequelize";

export const startCleanupCron = () => {

  // Run daily at 1:00 AM
  cron.schedule("0 1 * * *", async () => {

    console.log("Running Cleanup Cron...");

    try {

      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const deleted = await Leave.destroy({
        where: {
          status: "rejected",
          createdAt: {
            [Op.lt]: threeMonthsAgo,
          },
        },
      });

      console.log(`${deleted} old leaves deleted`);

    } catch (error) {
      console.error("Cleanup Cron Error:", error);
    }

  });

};
