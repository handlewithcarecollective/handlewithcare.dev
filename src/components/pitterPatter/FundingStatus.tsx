import cx from "classnames";

interface Props {
  value: string;
  sponsorCount: number;
  className?: string;
}

export function FundingStatus({ value, sponsorCount, className }: Props) {
  return (
    <div
      className={cx(
        "border-green font-headings flex w-full flex-col justify-between gap-5 rounded-[2.5rem] border-2 bg-white px-8 py-6 md:flex-row",
        className,
      )}
    >
      <div>
        <p className="text-2xl">{value}/mo</p>
        <p className="uppercase">Raised so far</p>
      </div>
      <div>
        <p className="text-2xl">{sponsorCount}</p>
        <p className="uppercase">Organizations</p>
      </div>
    </div>
  );
}
