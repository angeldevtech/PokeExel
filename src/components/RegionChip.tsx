interface RegionChipProps {
  region: string;
}

export function RegionChip(props: RegionChipProps) {
  return (
    <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800">
      {props.region}
    </span>
  );
}
