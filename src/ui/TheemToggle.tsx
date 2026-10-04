import {Dropdown} from "@heroui/react";
import {
  IconCheck,
  IconDeviceDesktop,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import {useTheme, type Theme} from "../lib/theme";

function TheemToggle() {
  const {theme, resolvedTheme, setTheme} = useTheme();

  return (
    <Dropdown>
      <Dropdown.Trigger className="inline-flex items-center gap-2 px-3 py-1.5 h-8 text-xs font-medium rounded-xl bg-surface border border-border text-foreground hover:bg-surface-secondary cursor-pointer transition-colors outline-none">
        {resolvedTheme === "dark" ? (
          <IconMoon size={16} stroke={1.8} className="text-warning" />
        ) : (
          <IconSun size={16} stroke={1.8} className="text-warning" />
        )}
        <span>
          {theme === "light" ? "فاتح" : theme === "dark" ? "داكن" : "النظام"}
        </span>
      </Dropdown.Trigger>

      <Dropdown.Popover
        placement="bottom end"
        className="p-1 min-w-36 rounded-xl border border-border bg-surface shadow-lg">
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={[theme]}
          onAction={(key) => setTheme(key as Theme)}
          className="flex flex-col gap-0.5 outline-none">
          <Dropdown.Item
            id="light"
            textValue="فاتح"
            className="flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer hover:bg-surface-secondary text-foreground data-[selected=true]:font-medium transition-colors">
            <div className="flex items-center gap-2">
              <IconSun size={16} stroke={1.8} />
              <span>فاتح</span>
            </div>
            {theme === "light" && (
              <IconCheck size={14} className="text-accent" />
            )}
          </Dropdown.Item>

          <Dropdown.Item
            id="dark"
            textValue="داكن"
            className="flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer hover:bg-surface-secondary text-foreground data-[selected=true]:font-medium transition-colors">
            <div className="flex items-center gap-2">
              <IconMoon size={16} stroke={1.8} />
              <span>داكن</span>
            </div>
            {theme === "dark" && (
              <IconCheck size={14} className="text-accent" />
            )}
          </Dropdown.Item>

          <Dropdown.Item
            id="system"
            textValue="النظام"
            className="flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer hover:bg-surface-secondary text-foreground data-[selected=true]:font-medium transition-colors">
            <div className="flex items-center gap-2">
              <IconDeviceDesktop size={16} stroke={1.8} />
              <span>النظام</span>
            </div>
            {theme === "system" && (
              <IconCheck size={14} className="text-accent" />
            )}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

export default TheemToggle;
