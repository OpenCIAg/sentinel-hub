export declare class SentinelHubURL {
    parameters: any[];
    link: string;
    preset: string;
    request: string;
    UUID: string;
    timeFrom: any;
    timeTo: any;
    constructor();
    addUUID(uuid: string): void;
    addParameter(name: string, value: any): void;
    setTimeFrom(date: Date): void;
    setTimeTo(date: Date): void;
    clearTime(): void;
    toString(): string;
    private getLinkTime;
}
