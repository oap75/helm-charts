import { KubeConfig } from "@kubernetes/client-node";
import { Command, Flags } from "@oclif/core";

import DAppOperator from "../application.js";

export default class Start extends Command {
    static summary = "Run operator.";

    static description =
        "Run operator, which listens to Cartesi Rollups CRDs and spawn Cartesi Rollups Nodes";

    static examples = ["<%= config.bin %> <%= command.id %>"];

    static flags = {
        namespace: Flags.string({
            summary: "kubernetes namespace to watch for DApps",
            default: "default",
        }),
    };

    public async run(): Promise<void> {
        const { flags } = await this.parse(Start);

        const kubeConfig = new KubeConfig();
        kubeConfig.loadFromDefault();

        // start operator
        const operator = new DAppOperator(kubeConfig, flags.namespace);
        await operator.start();
        const exit = (_reason: string) => {
            operator.stop();
            process.exit(0);
        };
        process
            .on("SIGTERM", () => exit("SIGTERM"))
            .on("SIGINT", () => exit("SIGINT"));
    }
}
